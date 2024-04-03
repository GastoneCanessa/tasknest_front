import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SingleTask from "./SingleTask";
import NewListForm from "./NewListForm";
import NewTaskForm from "./NewTaskForm";
import '../content/content.css';


export default function Board(props) {
    const [board, setBoard] = useState({ my_tasklists: [], title: "azz" });
    const [fliker, setFliker] = useState(true);
    const [activeListForNewTask, setActiveListForNewTask] = useState(null);

    const loadBoard = () => {
        axios.get(`/boards/${props.board.id}`)
            .then((response) => {
                setBoard(response.data);
            })
            .catch((error) => {
                console.error('Error fetching boards:', error);
            });
    };

    useEffect(() => {
        loadBoard(); // Chiamata iniziale per caricare la board
    }, [props.board.id]); // Dipendenze useEffect

    const handleToggleNewTaskForm = (listId) => {
        setActiveListForNewTask(activeListForNewTask === listId ? null : listId);
    };

    const onDragEnd = (result) => {
        const { destination, source, type, draggableId } = result;

        // Se non c'è una destinazione, non fare nulla
        if (!destination) return;

        // Gestione del riordinamento delle liste
        if (type === "column") {
            const newTaskLists = Array.from(board.my_tasklists);
            const [reorderedItem] = newTaskLists.splice(source.index, 1);
            newTaskLists.splice(destination.index, 0, reorderedItem);

            // Aggiorna lo stato per riflettere il nuovo ordine
            setBoard({ ...board, my_tasklists: newTaskLists });

            // Chiamata Axios per aggiornare la posizione della lista nel backend
            axios.put(`/list/position`, {
                idList: reorderedItem.id,
                newPosition: destination.index + 1 // Assumi che l'indice inizia da 1 nel tuo backend
            })
                .then(() => {
                    console.log('Posizione della lista aggiornata con successo.');
                    loadBoard()
                })
                .catch((error) => {
                    console.error('Errore nell\'aggiornamento della posizione della lista:', error);
                });
        } else if (type === "task") {
            const startListIndex = board.my_tasklists.findIndex(list => `droppable-tasklist-${list.title}` === source.droppableId);
            const finishListIndex = board.my_tasklists.findIndex(list => `droppable-tasklist-${list.title}` === destination.droppableId);

            const startList = board.my_tasklists[startListIndex];
            const finishList = board.my_tasklists[finishListIndex];

            // Rimuovi la task dalla sua posizione originale
            const newStartTasks = Array.from(startList.my_tasks);
            const [movedTask] = newStartTasks.splice(source.index, 1);

            // Se la task è stata spostata all'interno della stessa lista
            if (startList === finishList) {
                newStartTasks.splice(destination.index, 0, movedTask); // Inserisci la task nella nuova posizione
                const newBoard = { ...board };
                newBoard.my_tasklists[startListIndex].my_tasks = newStartTasks;
                setBoard(newBoard); // Aggiorna lo stato in maniera ottimistica
            } else {
                // Rimuovi la task dalla sua lista originale
                const newStartTasks = Array.from(startList.my_tasks);
                const [movedTask] = newStartTasks.splice(source.index, 1);

                // Aggiungi la task alla lista di destinazione
                const newFinishTasks = Array.from(finishList.my_tasks);
                newFinishTasks.splice(destination.index, 0, movedTask);

                // Aggiorna lo stato con le liste modificate
                const newBoard = { ...board };
                newBoard.my_tasklists[startListIndex].my_tasks = newStartTasks;
                newBoard.my_tasklists[finishListIndex].my_tasks = newFinishTasks;

                setBoard(newBoard);
            }

            // Successivamente, effettua la chiamata al server per aggiornare la posizione della task
            axios.put(`/tasks`, {
                id: draggableId,
                position: destination.index + 1,
                tasklistPosition: finishListIndex + 1,
                boardId: board.id
            })
                .then(() => {
                    loadBoard();
                })
                .catch((error) => {
                    console.error('Errore nell\'aggiornamento della posizione della task:', error);
                    // Gestisci l'errore, potenzialmente ripristinando lo stato precedente o mostrando un messaggio all'utente
                });
        }
    };

    function deleteList(idList) {
        axios.delete(`/list/${idList}`)
            .then(() => {
                loadBoard();
            })
            .catch((error) => {
                console.error('Errore nell\'cancellazione della task:', error);
                // Gestisci l'errore, potenzialmente ripristinando lo stato precedente o mostrando un messaggio all'utente
            });
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1 className="title mx-4">{board.title}</h1>
            <Droppable droppableId={board.title} direction="horizontal" type="column">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="d-flex"
                        style={{ overflowX: 'auto', whiteSpace: 'nowrap', height: "83vh" }}
                    >
                        {board.my_tasklists.map((list, index) => (
                            <Draggable key={list.id} draggableId={String(list.title)} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className=" p-3"
                                    >
                                        <div className="card p-3" style={{ width: "15vw", backgroundColor: "#4D5771", opacity: "95%" }}>
                                            <div className="d-flex justify-content-between">
                                                <p className="title-secondary">{list.title}</p>
                                                <h1 className="title-secondary" onClick={() => deleteList(list.id)}>X</h1>
                                            </div>
                                            {/* <p>{list.position}</p> */}
                                            {/* Droppable per le task */}
                                            <Droppable droppableId={`droppable-tasklist-${list.title}`} type="task">
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        {list.my_tasks && list.my_tasks.map((task, taskIndex) => (
                                                            <SingleTask key={task.id} task={task} index={taskIndex} loadBoard={loadBoard} />
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            {
                                                activeListForNewTask === list.id ?
                                                    <div className="">
                                                        <div className="card p-1" >
                                                            <div className="d-flex">
                                                                <NewTaskForm tasklist_id={list.id} loadBoard={loadBoard} onClose={() => setActiveListForNewTask(null)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="" onClick={() => { handleToggleNewTaskForm(list.id) }}>
                                                        <div className="card px-4 pt-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                                                            <div className="d-flex" >
                                                                <h4>+&nbsp;</h4><p> Add Task</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                            }
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {
                            fliker ?
                                <div className="p-3" onClick={() => { setFliker(!fliker) }}>
                                    <div className="card p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                                        <div className="d-flex">
                                            <h4>+&nbsp;</h4><p> Aggiungi un altra lista</p>
                                        </div>
                                    </div>
                                </div> :
                                <div className="p-3">
                                    <div className="card p-3" >
                                        <div className="d-flex">
                                            <NewListForm boardId={props.board.id} loadBoard={loadBoard} onClose={() => setFliker(true)} />
                                        </div>
                                    </div>
                                </div>
                        }

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

// function SingleTask({ task, index }) {
//     return (
//         <Draggable draggableId={String(task.id)} index={index}>
//             {(provided) => (
//                 <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     className="card my-2"
//                 >
//                     <div className="card-content">
//                         <p>{task.title}</p>
//                         <p>{task.position}</p>
//                         {/* Qui puoi aggiungere ulteriori dettagli della task */}
//                     </div>
//                 </div>
//             )}
//         </Draggable>
//     );
// }