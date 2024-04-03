// NewBoardForm.js
import React, { useState } from 'react';
import axios from 'axios';
import BackgroundSelector from '../common/BackgroundSelector';
import { currentUser } from '../../App';
import { useAtom } from 'jotai';
import backgrounds from '../../assets/background';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../content/content.css';

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
      width: '70%', // Imposta la larghezza del popup
      minHeight: '80%', // Imposta l'altezza del popup
      backgroundColor: '#2C3240',
      padding: '20px',
      paddingBottom: '40px',
      zIndex: 100,
      border: '0px solid #ccc', // Aggiungi un bordo (opzionale)
      borderRadius: '5px', // Bordi arrotondati (opzionale)
    }}>
      <div className='d-flex'>
        <button type="button" className='close-button' onClick={onClose}><FontAwesomeIcon icon={faXmark} className='fs-3' /></button>
        <div className='d-flex' style={{ flex: '1', justifyContent: 'center', alignItems: 'center' }}>
          <h2 className='title fs-3 fw-medium' >Create a new board</h2>
        </div>
      </div>
      <div className='row m-5'>
        <h4 className='mb-3 fw-light' style={{ color: "#EAEBED" }}>Choose a background</h4>
        {Object.entries(backgrounds).map(([id, path]) => (
          <div className='col' key={id} onClick={() => selectBackground(id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <img src={path} alt={`Sfondo ${id}`} className='bg-image' />
          </div>
        ))}
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <form className='' onSubmit={handleSubmit} >
          <div className='mb-2'>
            <h5 className='mb-0 fw-light' style={{ color: "#EAEBED" }} >Title</h5>
            <input type="text" name="title" className="inputtitle" value={board.title} onChange={handleInputChange} placeholder="Insert title..." />
          </div>

          <div>
            <h5 className='mb-0 fw-light' style={{ color: "#EAEBED" }}>Description</h5>
            <input type="text" name="description" className='inputdescr' value={board.description} onChange={handleInputChange} placeholder="Insert description..." />
          </div>

          <div>
            <input type="checkbox" name="visible" checked={board.visible} onChange={handleInputChange} placeholder="Visibilita" />
            <label className="form-label ps-2" style={{ color: '#EAEBED' }}>Visible</label>
          </div>


          <div className='d-flex justify-content-center'>
            <button type="submit" className='crea-button'><h5>Create</h5></button>
          </div>

        </form>
      </div>
    </div>
  );
};

// const styles = {
//   inputtitle: {

//     width: '40%',
//     padding: '10px',
//     margin: '10px 0',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//   },
//   inputdescr: {

//     width: '40%',
//     height: '10vh',
//     padding: '10px',
//     margin: '10px 0',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//   },

//   button: {

//     background: '#40d3fb',
//     color: '#EAEBED',
//     border: 'none',
//     padding: '10px 40px',
//     margin: '10px 2px',
//     width: '6vw',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   },
//   exit: {
//     border: 'none',
//     background: 'none',
//     color: '#40d3fb'
//   }
// };

export default NewBoardForm;

