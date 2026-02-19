/**
 * Todo List Controller
 * Manages complex, nested todo data within the sqlite database.
 * Features deep-merging for updates and atomic ID generation.
 */


/**
 * @route   GET /api/todos
 * @desc    Fetch all todos records from the sqlite database
 * @access  Public
*/
export const getTodoList = async (req, res) => {
    try {
        const tasks = await req.db.all(
            `select * FROM tasks order by dueTo`
            // `select id, title, content, dueTo, status FROM tasks`
        );
        // res.status(200).json(JSON.stringify(tasks));
        res.status(200).json(tasks);
    } catch (error) {
        // This catches "sqlite database Errors" (Requirement 3a)
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Could not retrieve tasks from the sqlite database."
        });
    }
}

/**
 * @route   GET /api/todos/:id
 * @desc    Fetch a specific task record by its ID
 */
export const getTodoItem = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await req.db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);
        
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: "Not Found", message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message });
    }
}

export const updateTodoTask = async (req, res) => {
    const { id } = req.params; // Get ID from URL
    const updates = req.body;
    const db = await req.db;

    // 1. Filter out the fields that were actually sent in the request
    const fields = [];
    const values = [];

    if (updates.title !== undefined) {
        fields.push("title = ?");
        values.push(updates.title);
    }
    if (updates.content !== undefined) {
        fields.push("content = ?");
        values.push(updates.content);
    }
    if (updates.dueTo !== undefined) {
        fields.push("dueTo = ?");
        values.push(updates.dueTo);
    }
    if (updates.status !== undefined) {
        fields.push("status = ?");
        values.push(updates.status);
    }

    // 2. If no fields were provided, just return
    if (fields.length === 0) {
        return res.status(400).json({ error: "No fields provided for update" });
    }

    // 3. Add the ID to the values array for the WHERE clause
    values.push(id);

    // 4. Construct the query: UPDATE tasks SET field1 = ?, field2 = ? WHERE id = ?
    const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;

    try {
        await db.run(sql, values);
        // Return the full updated list so the frontend can refresh
        const updatedTasks = await db.all('SELECT * FROM tasks');
        res.json(updatedTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "sqlite database update failed" });
    }
};
/**
 * @route   POST /api/todos/:id
 * @desc    Create a new task record with an auto-incrementing ID
 */
export const addTodoItem = async (req, res) => {
    try {        
        const { title, content, status, dueTo } = req.body;
        const result = await req.db.run(
            `INSERT INTO tasks (title, content, status, dueTo) VALUES (?, ?, ?, ?)`,
            [title, content || '', status || 0, dueTo]
        );
        res.status(201).json({ id: result.lastID, message: "Task Created" });
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }

}
/**
 * @route   DELETE /api/todo/:id
 * @desc    Remove an todos record from the sqlite database
 */
export const deleteTodoItem = async (req, res) => {
    try {
        const { id } = req.params;
        // SQL Syntax fix: DELETE FROM (No *)
        await req.db.run(`DELETE FROM tasks WHERE id = ?`, [id]);
        res.status(204).json({ id, message: "Task Deleted" });
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}