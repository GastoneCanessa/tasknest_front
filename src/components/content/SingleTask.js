import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SingleTask(props) {

    const [list, setList] = useState({ my_tasks: [], title: "azz" });

    const loadList = () => {

        axios.get(`/lists/${props.t.id}`)
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching lists:', error);
            });

    };

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newTask = Array.from(props.padre);
        const [reorderedItem] = newTask.splice(source.index, 1);
        newTask.splice(destination.index, 0, reorderedItem);

        setList({ ...props.padre, my_tasks: newTask });

        axios.put('/tasks', {
            id: reorderedItem.id,
            position: destination.index + 1
        })
            .then(() => {
                console.log('Posizione aggiornata con successo.');
                loadList();
            })
            .catch((error) => {
                console.error('Errore nell\'aggiornamento della posizione:', error);
            });
    };

    useEffect(() => {
        loadList();
    }, [props.padre.id]);

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>

                <Droppable droppableId={props.t.title} direction="vertical">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="row"
                        >

                            <Draggable key={props.t.id} draggableId={String(props.t.id)} index={props.t.position}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="col p-3"
                                    >
                                        <h5>{props.t.title}</h5>
                                        <h5>{props.t.position}</h5>
                                    </div>
                                )}
                            </Draggable>

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </>
    );
}