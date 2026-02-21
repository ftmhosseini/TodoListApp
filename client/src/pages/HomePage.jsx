import { useEffect, useState } from "react";
import { useAppContext } from "../service/todoContext";
import { AddTodoItem } from '../components/AddTodoItem'
import { DragAndDropTodoItems } from "../components/DragAndDropTodoItems";

export const HomePage = () => {
    const { todoList, fetchTodos, addTodo } = useAppContext();

    const [isFormOpen, setIsFormOpen] = useState(false);

    // 2. Fetch data from server when page loads
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // 3. TRANSFORM the data for the DragAndDropList
    // This happens every render, ensuring the list is always fresh
    const FilteredData = {
        todo: [],
        done: []
    };

console.log(todoList);

    Array.from(todoList).forEach(todo => {
        const item = { id: todo.id.toString(), title: todo.title, context: todo.content };
        if (todo.status === 1 || todo.completed) {
            FilteredData.done.push(item);
        } else {
            FilteredData.todo.push(item);
        }
    });

    return (
        <div>
            {!isFormOpen && (
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="add-button">
                    + Add New Task
                </button>
            )}

            {/* 4. The Conditional Form */}
            {isFormOpen && (
                <AddTodoItem addTodo={addTodo} fetchTodos={() => {
                    fetchTodos()
                    setIsFormOpen(false)
                }} onCancel={() => setIsFormOpen(false)} />
            )}
            <div style={{ display: "flex" }}>
                {/* <DragAndDropList
                    key={todoList.length}
                    InitialData={FilteredData}

                /> */}
                <DragAndDropTodoItems
                    key={todoList.length}
                    InitialData={FilteredData}
                />
            </div>
        </div>
    );
}