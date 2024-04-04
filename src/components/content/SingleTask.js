import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

function SingleTask({ task, index, loadBoard }) {


    function deleteTask(idTask, event) {
        event.stopPropagation(); // Questo impedisce che l'evento di click si propaghi al componente Link.
        axios.delete(`/tasks/${idTask}`)
            .then(() => {
                loadBoard();
            })
            .catch((error) => {
                console.error('Errore nell\'eliminazione della task:', error);
                // Gestisci l'errore, potenzialmente ripristinando lo stato precedente o mostrando un messaggio all'utente
            });
    }

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="card my-2"
                >

                    <div className="card px-3 py-1 " style={{ backgroundColor: "#2C3240" }}>
                        {/* <Link className=" " to={"/task/" + task.id}>premi qui</Link> */}
                        <div className='d-flex justify-content-between'>
                            <Link className=" " to={"/task/" + task.id}>
                                <p className='title-secondary'>{task.title}</p>
                            </Link>
                            <div className="title-secondary" onClick={(event) => deleteTask(task.id, event)}><FontAwesomeIcon icon={faXmark} className='fs-5' /></div>
                        </div>
                        {/* <p>{task.position}</p> */}
                        {/* Qui puoi aggiungere ulteriori dettagli della task */}
                    </div>

                </div>
            )}
        </Draggable>
    );
}

export default SingleTask;

{/* <div className="d-flex justify-content-between">
                                                <p className="title-secondary">{list.title}</p>
                                                <h1 className="title-secondary" onClick={() => deleteList(list.id)}>X</h1>
                                            </div> */}