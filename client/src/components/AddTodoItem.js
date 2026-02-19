import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

export const AddTodoItem = ({ addTodo, fetchTodos, onCancel }) => {
    // Initialize navigation hook to redirect user after form submission
    const navigate = useNavigate();
    // Define initial state for the task form fields
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        dueTo: "",
        status: 0
    });
    /**
         * Handles dynamic input changes for all form fields.
         * Updates specific state properties based on the input's 'name' attribute.
         */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    /**
         * Submits the new task to the backend via the context function.
         * Prevents empty submissions and redirects user upon success.
         */
    const handleAddTodo = async () => {
        // Guard clause: Prevent adding tasks without a title
        if (!formData.title.trim()) return;
        // Execute API call through the passed context provider function
        await addTodo({
            title: formData.title,
            content: formData.content,
            dueTo: formData.dueTo,
            status: 0
        });
        // Refresh the global list to include the new item and return to dashboard
        fetchTodos();
        navigate("/");
    };
    return <div className="add-form">
        <h3>Create New Task</h3>
        {/* Task Title Input */}
        <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
        />
        {/* Task Description Textarea */}
        <textarea
            style={{ marginTop: 10 }}
            name="content"
            placeholder="Description"
            value={formData.content}
            onChange={handleChange}
        />
        {/* Due Date Picker */}
        <input
            style={{ marginTop: 10 }}
            name="dueTo"
            type="date"
            value={formData.dueTo}
            onChange={handleChange}
        />

        <button className="button" onClick={handleAddTodo}>Save Task</button>
        <button onClick={onCancel} id="cancel-button">Cancel</button>
    </div>
}