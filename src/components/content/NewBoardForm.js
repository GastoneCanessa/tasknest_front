// NewBoardForm.js
import React, { useState } from 'react';
import axios from 'axios';
import BackgroundSelector from '../common/BackgroundSelector';
import { currentUser } from '../../App';
import { useAtom } from 'jotai';
import backgrounds from '../../assets/background';

const NewBoardForm = ({ onClose, onBoardAdded }) => {
  const [user, setUser] = useAtom(currentUser);
  const [board, setBoard] = useState(
    {
      userId: user.id,
      title: "",
      description: "",
      visible: "",
      img: ""
    }
  );

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Usa il valore 'checked' per i checkbox, altrimenti usa 'value'
    const inputValue = type === 'checkbox' ? checked : value;
    setBoard({ ...board, [name]: inputValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(board);
    try {
      await axios.post('/boards', board);
      onBoardAdded(); // Chiama questa funzione per aggiornare l'elenco delle bacheche
      onClose(); // Chiude il form
    } catch (error) {
      console.error('Error adding new board:', error);
    }
  };

  const selectBackground = async (id) => {
    setBoard({ ...board, img: Number(id)});
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -20%)',
      width: '80vw', // Imposta la larghezza del popup
      height: '80vh', // Imposta l'altezza del popup
      backgroundColor: 'white',
      padding: '20px',
      zIndex: 100,
      border: '1px solid #ccc', // Aggiungi un bordo (opzionale)
      borderRadius: '5px', // Bordi arrotondati (opzionale)
    }}>
      <form onSubmit={handleSubmit}>
        <div className='row m-5'>
          {Object.entries(backgrounds).map(([id, path]) => (
            <div className='col' key={id} onClick={() => selectBackground(id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              <img src={path} alt={`Sfondo ${id}`} style={{ width: '150px', height: '90px' }} />
            </div>
          ))}
        </div>
        <div>
          {/* <label className="form-label"><strong>Title</strong></label> */}
          <input type="text" name="title" value={board.title} onChange={handleInputChange} placeholder="Title" />
        </div>

        <div>
          {/* <label className="form-label"><strong>Description</strong></label> */}
          <input type="text" name="description" value={board.description} onChange={handleInputChange} placeholder="Descrizione" />
        </div>

        <div>
          {/* <label className="form-label"><strong>Visible</strong></label> */}
          <input type="checkbox" name="visible" checked={board.visible} onChange={handleInputChange} placeholder="Visibilita" />
        </div>

        <button type="submit">Crea</button>
        <button type="button" onClick={onClose}>Chiudi</button>
      </form>
    </div>
  );
};

export default NewBoardForm;
