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
                    <Link className=" " to={"/task/" + task.id}>
                    <div className="card px-3 py-1" style={{ backgroundColor: "#2C3240" }}>
                        {/* <Link className=" " to={"/task/" + task.id}>premi qui</Link> */}
                        <p className='title-secondary'>{task.title}</p>
                        {/* <p>{task.position}</p> */}
                        {/* Qui puoi aggiungere ulteriori dettagli della task */}
                    </div>
                    </Link>
                </div>
            )}
        </Draggable>
    );
}

export default SingleTask;