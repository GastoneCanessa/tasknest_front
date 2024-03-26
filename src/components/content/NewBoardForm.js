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
    setBoard({ ...board, img: Number(id) });
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -20%)',
      width: '80vw', // Imposta la larghezza del popup
      minHeight: '80vh', // Imposta l'altezza del popup
      backgroundColor: '#e9baca',
      padding: '20px',
      zIndex: 100,
      border: '0px solid #ccc', // Aggiungi un bordo (opzionale)
      borderRadius: '5px', // Bordi arrotondati (opzionale)
    }}>
      <button type="button" style={styles.exit} onClick={onClose}><h4>X</h4></button>
      <div className='row m-5'>
        {Object.entries(backgrounds).map(([id, path]) => (
          <div className='col' key={id} onClick={() => selectBackground(id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <img src={path} alt={`Sfondo ${id}`} style={{ width: '150px', height: '90px' }} />
          </div>
        ))}
      </div>
      <div className='d-flex justify-content-center' style={{padding: "2vh"}}>
        <form className='' onSubmit={handleSubmit}>
          <div>
            {/* <label className="form-label"><strong>Title</strong></label> */}
            <input type="text" name="title" style={styles.input} value={board.title} onChange={handleInputChange} placeholder="Title" />
          </div>

          <div>
            {/* <label className="form-label"><strong>Description</strong></label> */}
            <input type="text" name="description" style={styles.input} value={board.description} onChange={handleInputChange} placeholder="Descrizione" />
          </div>

          <div>
            <input type="checkbox" name="visible" checked={board.visible} onChange={handleInputChange} placeholder="Visibilita" />
            <label className="form-label ps-2">Visible</label>
          </div>

          <div className='d-flex justify-content-center'>
            <div>
              <button type="submit" style={styles.button}><h5>Crea</h5></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  input: {
    display: 'block',
    width: '70vw',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    background: '#aec5e5',
    color: 'white',
    border: 'none',
    padding: '10px 40px',
    margin: '10px 2px',
    width: '70vw',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  exit: {
    border: 'none',
    background: 'none',
    color : '#8ecdf6'
  }
};

export default NewBoardForm;

