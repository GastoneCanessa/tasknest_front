
import axios from "axios";
import { useState } from "react";

export default function NewListForm(props) {
    const [list, setList] = useState(
        {
            idBoard: props.boardId,
            title: "",
        }
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setList({ ...list, [name]: value });
        console.log(list);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/list', list);
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
                    <input type="text" name="title" onChange={handleInputChange} placeholder="Inserisci un titolo alla lista" />
                </div>

                <div className='d-flex justify-content-center'>
                    <div>
                        <button type="submit"><h5>Aggiungi lista</h5></button>
                    </div>
                </div>
            </form>
            <h3 onClick={()=>{props.onClose()}}>x</h3>
        </div>
    )
}