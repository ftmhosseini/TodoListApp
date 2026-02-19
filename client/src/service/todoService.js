import axios from "axios";
// Implementation of CRUD operation for todoContext

/**
 * GET: Fetches the full list of todos from the server.
 * Fetches all tasks.
 */
export const getTodos = async ()=> {
    try {
        const res = await axios.get(`/api/todos/`);
        return res.data;
    } catch (error) {
        console.error("Fetch Todo List Error:", error);
    }
}
// export function getTodos() {
//     return new Promise(resolve => {
//         axios.get("/api/todos")
//         .then(res => res.status === 200 && res.data)
//         .then(resolve)
//         .catch(console.error)
//     })
// }

/**
 * POST: Sends a new todo object to the database.
 * Creates a new task.
 */
export async function insertTodo(body) {    
    try {
        const res = await axios.post(`/api/todos/`, body);
        return res.data;
    } catch (error) {
        console.error("Update Task Error:", error);
    }
}

/**
 * PUT: Updates an existing todo by its unique ID.
 * Modifies an existing task.
 */
export async function updateTodo(id, body) {
    try {
        const res = await axios.put(`/api/todos/${id}`, body);
        return res.data;
    } catch (error) {
        console.error("Update Task Error:", error);
    }
}

/**
 * GET: Retrieves a single todo's details by its ID.
 * Finds one specific task.
 */
export async function getItem(id) {
    try {
        const res = await axios.get(`/api/todos/${id}`);
        console.log(res);
        
        return res.data;
    } catch (error) {
        console.error("Update Task Error:", error);
    }
}

/**
 * DELETE: Removes a todo from the server.
 * Permanently deletes a task.
 */
export async function deleteTodo(id) {
    try {
        const res = await axios.delete(`/api/todos/${id}`);
        return res.data;
    } catch (error) {
        console.error("Update Task Error:", error);
    }
}
