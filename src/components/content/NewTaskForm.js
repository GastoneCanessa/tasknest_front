import React, { useState } from 'react';
import axios from 'axios';
export default function NewTaskForm(props) {

    const [task, setTask] = useState(
        {
            tasklist_id: props.tasklist_id,
            title: "",
            description: "None",
            expired_date: "2100-01-01"
        }
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
        console.log(task);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/tasks', task);
            props.loadBoard(); // Chiama questa funzione per aggiornare l'elenco delle bacheche
            props.onClose(); // Chiude il form
        } catch (error) {
            console.error('Error adding new board:', error);
        }
    };

    return (
        <div>
            <form className='' onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="title" onChange={handleInputChange} placeholder="Inserisci un titolo " />
                </div>

                <div className='d-flex justify-content-center'>
                    <div>
                        <button type="submit"><h5>Aggiungi Task</h5></button>
                    </div>
                </div>
            </form>
            <h3 onClick={() => { props.onClose() }}>x</h3>
        </div>
    )
};