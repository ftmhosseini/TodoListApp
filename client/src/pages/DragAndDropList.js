import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAppContext } from '../service/todoContext';

export const DragAndDropList = ({InitialData}) => {
  const { changeTodoStatus } = useAppContext();
  const [lists, setLists] = useState(InitialData);
useEffect(() => {
    setLists(InitialData);
}, [InitialData]);
  const onDragEnd = async (result) => {
    
    const { source, destination, draggableId } = result;

    // Dropped outside a list
    if (!destination) return;

    // If dropped in the same list at the same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Logic to move item
    const sourceList = [...lists[source.droppableId]];
    const destList = [...lists[destination.droppableId]];
    const [removed] = sourceList.splice(source.index, 1);


    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, removed);
      setLists({ ...lists, [source.droppableId]: sourceList });
    } else {
      destList.splice(destination.index, 0, removed);
      setLists({ ...lists, [source.droppableId]: sourceList, [destination.droppableId]: destList });
      const newStatus = destination.droppableId === 'done' ? 1 : 0;
      await changeTodoStatus(draggableId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '20px',left:'50vw', height: '50vh', width:'calc(100%/2)', overflowY:"scroll" }}>
        {['todo', 'done'].map((listId) => (
          <Droppable key={listId} droppableId={listId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ background: '#eee', padding: 10, width: 200 ,overflowY:'scroll'}}>
                <h3>{listId.toUpperCase()}</h3>
                {lists[listId].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        style={{ userSelect: 'none', padding: 16, margin: '0 0 8px 0', background: 'white', ...provided.draggableProps.style }}>
                        {item.content}
                        <details><summary>{item.title}</summary><p>{item.content}</p></details>
                        <i className='fa-solid fa-edit'></i>
                        <p className="edit-btn" onClick={()=>{console.log("nothing")}}>🖊️</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
