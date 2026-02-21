import { createContext, useContext, useMemo, useState, useCallback } from "react"
import { getTodos, insertTodo, deleteTodo, getItem, updateTodo } from "./todoService";

// Create a Context object to hold global data
// Creates the 'Context' object—the global storage container for your Todo data.
const AppContext = createContext();
// Extract the Provider component to wrap the app and share data
// Pulls out the 'Provider' component used to wrap the app and "broadcast" the data.
const { Provider } = AppContext;

const AppProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([]);
    // Retrieves the latest list of tasks from the service and updates the local state.
    const fetchTodos = useCallback(async () => {
        try {
            const data = await getTodos();
            // Force it to be an array even if the API sends back null or an error
            setTodoList(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch:", err);
            setTodoList([]); // Fallback to empty array so the UI doesn't crash
        }
    }, []);

    // Sends a new task to the database, then triggers a refresh of the list.
    const addTodo = useCallback((body) => {
        insertTodo(body).then(() => fetchTodos());
    }, [fetchTodos])
    // Updates an existing task's details and synchronizes the UI with the changes.
    const editTodo = useCallback(async (id, body) => {
        return updateTodo(id, body).then(() => fetchTodos());
    }, [fetchTodos])
    // Fetches a specific task's details by its ID (currently triggers a list refresh).
    const getTask = useCallback(async (id) => {
        return getItem(id);
    }, [])
    // Removes a task from the database and updates the UI to reflect the removal.
    const deleteTask = useCallback(async (id) => {
        return deleteTodo(id).then(() => fetchTodos())
    }, [fetchTodos])
    // useMemo: Memoizes the data object so child components don't re-render 
    // unless the todoList or functions actually change.
    const value = useMemo(() => ({
        todoList,
        fetchTodos,
        getTask,
        addTodo,
        deleteTask,
        editTodo
    }), [todoList, fetchTodos, getTask, addTodo, deleteTask, editTodo])
    return <Provider value={value}>{children}</Provider>
}

/**
 * A custom hook that allows components to "consume" the Todo data.
 * It includes a safety check to ensure it's only used within an AppProvider.
 */
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppContext must be used inside an AppProvider"
        );
    }

    return context;
}

export default AppProvider;