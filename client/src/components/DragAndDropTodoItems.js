import { useAppContext } from '../service/todoContext';
import { useState, useEffect } from 'react';
import { EditTask } from './EditTask';

export const DragAndDropTodoItems = ({ InitialData }) => {
    const { editTodo, deleteTask } = useAppContext();
    const [lists, setLists] = useState(InitialData);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    useEffect(() => {
        setLists(InitialData);
    }, [InitialData]);

    // 1. Drag Start: Capture the metadata of the item being moved
    const handleDragStart = (e, index, sourceListId) => {
        const dragInfo = { index, sourceListId };
        // We stringify because dataTransfer only accepts strings
        e.dataTransfer.setData("drag-info", JSON.stringify(dragInfo));
        // Visual feedback: reduce opacity of the original item
        e.target.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        // Remove visual feedback when drag operation completes
        e.target.classList.remove('dragging');
    };

    // 2. Drag Over: Necessary to enable the "Drop" zone
    // Allow Drop: Required to prevent the browser's default "reset" behavior
    const handleDragOver = (e) => {
        // Prevent default browser behavior to allow drop events to fire
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    // 3. The Drop: Where the state update happens
    // 3. The Drop: Execute state update and API sync
    const handleDrop = async (e, targetListId) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("drag-info");
        if (!data) return;

        const { index: sourceIndex, sourceListId } = JSON.parse(data);

        // If dropped in the same spot, do nothing
        // Guard clause: Exit if item is dropped back into its original list
        if (sourceListId === targetListId) return;

        // Clone lists to avoid direct mutation
        // Immutable state update: Create shallow copies of the lists
        const newLists = { ...lists };
        const sourceList = [...newLists[sourceListId]];
        const targetList = [...newLists[targetListId]];

        // Remove from source, add to target
        const [movedItem] = sourceList.splice(sourceIndex, 1);
        targetList.push(movedItem);

        // Update UI state immediately for better UX
        setLists({
            ...newLists,
            [sourceListId]: sourceList,
            [targetListId]: targetList
        });

        // Trigger your context API update (assuming item has an 'id' property)
        // Determine completion status (1 for Done, 0 for Todo) for SQLite update
        const newStatus = targetListId === 'done' ? 1 : 0;

        if (movedItem.id) {
            // Sync the change with the backend database
            await handleUpdateTask({ id: movedItem.id, status: newStatus });
        }
    };

    // This function handles the actual data change
    const handleUpdateTask = async (updatedTask) => {

        if (updatedTask.id) {
            await editTodo(updatedTask.id, updatedTask);
        }
        setIsFormOpen(false); // Close form after saving
    };
    // This function handles the actual data change
    const handleDeleteTask = async (taskId) => {
        if (taskId) {
            await deleteTask(taskId);
        }
        setIsFormOpen(false);
    };

    return (
        <div className='container mobile-container' style={{ flexDirection: 'column', paddingBottom: '29vh' }}>
            <div className='container' style={{ flexDirection: 'row', gap: '10px' }}>
                {['todo', 'done'].map((listId) => (
                    <div key={listId}>
                        {/* implement Drag and Drop approach for these columns */}
                        <div
                            key={listId}
                            className="drop-zone"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, listId)}
                            style={{ width: '35vw', background: '#f4f4f4' }}
                        >

                            <h3>
                                {listId === 'todo' ? '📝 ' : '📋 '}
                                {listId.toUpperCase()}
                            </h3>
                            {lists[listId].length === 0 && <h3>This {listId} List is empty</h3>}
                            {lists[listId].length > 0 && lists[listId].map((item, index) => (
                                <div
                                    key={`${listId}-${index}`}
                                    className="draggable-item list"
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, index, listId)}
                                    onDragEnd={handleDragEnd}
                                >
                                    {/* Item Title/Text */}
                                    <span style={{ fontWeight: '500', color: 'black' }}>
                                        {item.title}
                                    </span>

                                    {/* Action Buttons (The Pen) */}
                                    <button
                                        onClick={() => {
                                            console.log("Edit item:", item)
                                            setIsFormOpen(true)
                                            setItemToEdit(item)
                                        }
                                        }
                                        id='edit'
                                    >
                                        ✏️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}</div>
            {isFormOpen && <EditTask task={itemToEdit} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} onCancel={() => setIsFormOpen(false)} />}
        </div>
    );
};