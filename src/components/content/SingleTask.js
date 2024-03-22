import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

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
                    <div className="card-content px-3 py-1">
                        <Link className=" " to={"/task/" + task.id}>premi qui</Link>

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