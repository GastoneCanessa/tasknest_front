// NewBoardForm.js
import React, { useState } from 'react';
import axios from 'axios';
import BackgroundSelector from '../common/BackgroundSelector';

const NewBoardForm = ({ onClose, onBoardAdded }) => {
  const [boardName, setBoardName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/boards', { title: boardName });
      onBoardAdded(); // Chiama questa funzione per aggiornare l'elenco delle bacheche
      onClose(); // Chiude il form
    } catch (error) {
      console.error('Error adding new board:', error);
    }
  };

  return (
    <div style= {{ 
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
        <BackgroundSelector/>
        <input type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)} placeholder="Nome della bacheca" />
        <button type="submit">Crea</button>
        <button type="button" onClick={onClose}>Chiudi</button>
      </form>
    </div>
  );
};

export default NewBoardForm;
