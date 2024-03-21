import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function SingleTask({ task, index }) {
    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="card my-2"
                >
                    <div className="card-content">
                        <p>{task.title}</p>
                        <p>{task.position}</p>
                        {/* Qui puoi aggiungere ulteriori dettagli della task */}
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default SingleTask;