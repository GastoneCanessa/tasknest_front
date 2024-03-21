import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Board(props) {
    const [board, setBoard] = useState({ my_tasklists: [], title: "azz"});

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
        const { destination, source } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newTaskLists = Array.from(board.my_tasklists);
        const [reorderedItem] = newTaskLists.splice(source.index, 1);
        newTaskLists.splice(destination.index, 0, reorderedItem);

        setBoard({ ...board, my_tasklists: newTaskLists });

        axios.put('/list/position', {
            idList: reorderedItem.id,
            newPosition: destination.index+1
        })
        .then(() => {
            console.log('Posizione aggiornata con successo.');
            loadBoard();
        })
        .catch((error) => {
            console.error('Errore nell\'aggiornamento della posizione:', error);
        });
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1>{board.title}</h1>
            <Droppable droppableId={board.title} direction="horizontal">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="row"
                    >
                        {board.my_tasklists.map((list, index) => (
                            <Draggable key={list.id} draggableId={String(list.id)} index={index}>
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
