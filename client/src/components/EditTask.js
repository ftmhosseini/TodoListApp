import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../service/todoContext";

/**
 * EditTask Component: Manages the modification of an existing task.
 * It fetches fresh data from the SQLite DB and maintains a local state for the form.
 */
export const EditTask = ({ task, onUpdate, onDelete, onCancel }) => {
    const { getTask } = useAppContext();
    const navigate = useNavigate();

    // Local state for the form fields to ensure high-performance typing (controlled component)
    const [localTask, setLocalTask] = useState({ title: '', content: '', dueTo: '', status: 0 });

    useEffect(() => {
        /**
         * Fetch the most up-to-date version of the task from the database
         * to ensure the user is editing the current record.
         */
        const fetchTask = async () => {
            if (task) {

                const data = await getTask(task.id);

                // Synchronize local state with the database response
                setLocalTask(data || '');
            }
        };

        fetchTask();
    }, [task, getTask]); // Reruns if the selected task changes

    // Loading state: ensures the component doesn't crash if 'task' is temporarily undefined
    if (!task) return (<div>Loading task details...</div>);

    /**
     * Specialized handler for input changes.
     * Specifically handles the conversion of Checkbox booleans to SQLite integers (1/0).
     */
    const handleLocalChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLocalTask(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    // Generalized handler for standard text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalTask(prev => ({ ...prev, [name]: value }));
    };

    /**
         * Submits updated data to the parent context and redirects to the dashboard.
         */
    const handleUpdate = async () => {
        await onUpdate(localTask); // Assuming this is your API/Context call
        navigate("/"); // Redirect home after success
    };

    /**
     * Triggers the delete confirmation and API call.
     */
    const handleDeleteAction = async () => {
        if (window.confirm("Are you sure you want to delete this?")) {
            await onDelete(localTask.id);
            navigate("/"); // Redirect home after deletion
        }
    };
    return (
        <div style={{
            display: "flex",
            width: '75vw',
            flexDirection: "column",
            border: '1px solid #ddd',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3>Edit Task</h3>
            <input
                name="title"
                type="text"
                value={localTask.title}
                onChange={handleChange}
            />
            <textarea
                style={{ marginTop: 10 }}
                name="content"
                value={localTask.content}
                onChange={handleChange}
            />
            <input
                style={{ marginTop: 10 }}
                name="dueTo"
                type="date"
                value={localTask.dueTo}
                onChange={handleChange}
            />
            <div className="container" style={{ alignContent: 'center', alignItems: 'center' }}>
                <label htmlFor="checkbox">{'Is completed'}</label>
                <input
                    id="checkbox"
                    style={{ marginTop: 10 }}
                    type="checkbox"
                    name='status'
                    checked={localTask.status === 1}
                    onChange={handleLocalChange}
                />
            </div>

            <button
                className="button"
                style={{ backgroundColor: "green" }}
                onClick={handleUpdate}
            >
                Update Task
            </button>
            <button
                className="button"
                style={{ backgroundColor: "red" }}
                onClick={handleDeleteAction}
            >
                Delete Task
            </button>
            <button onClick={onCancel} id='cancel-button'> Cancel</button>
        </div>
    )
}