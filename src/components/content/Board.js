import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SingleTask from "./SingleTask";

export default function Board(props) {
    const [board, setBoard] = useState({ my_tasklists: [], title: "azz" });

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
                // Gestisci lo spostamento tra liste diverse se necessario
            }

            // Successivamente, effettua la chiamata al server per aggiornare la posizione della task
            axios.put(`/tasks`, {
                id: draggableId,
                position: destination.index + 1
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



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1>{board.title}</h1>
            <Droppable droppableId={board.title} direction="horizontal" type="column">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="row"
                    >
                        {board.my_tasklists.map((list, index) => (
                            <Draggable key={list.id} draggableId={String(list.title)} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="col p-3"
                                    >
                                        <div className="card p-3">
                                            <p>{list.title}</p>
                                            <p>{list.position}</p>
                                            {/* Droppable per le task */}
                                            <Droppable droppableId={`droppable-tasklist-${list.title}`} type="task">
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        {list.my_tasks && list.my_tasks.map((task, taskIndex) => (
                                                            <SingleTask key={task.id} task={task} index={taskIndex} />
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
