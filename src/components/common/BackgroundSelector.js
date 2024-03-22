import React, { useState } from 'react';
import backgrounds from '../../assets/background'; // Assicurati di inserire il percorso corretto

const BackgroundSelector = () => {
  const [selectedBackground, setSelectedBackground] = useState('');

  const submitBackground = async () => {
    try {
      // Sostituisci 'your-backend-url' con l'URL effettivo del tuo backend
      const response = await fetch('your-backend-url', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ background: selectedBackground }),
      });
      const data = await response.json();
      console.log(data); // Gestisci la risposta come preferisci
    } catch (error) {
      console.error('Error submitting background:', error);
    }
  };

  return (
    <div>
      {Object.entries(backgrounds).map(([id, path]) => (
        <div key={id} style={{ marginBottom: '10px' }}>
          <input
            type="radio"
            id={`background-${id}`}
            name="background"
            value={path}
            onChange={(e) => setSelectedBackground(e.target.value)}
            checked={selectedBackground === path}
          />
          <label htmlFor={`background-${id}`}>
            <img src={path} alt={`Sfondo ${id}`} style={{ width: '100px', height: 'auto' }} />
          </label>
        </div>
      ))}
      <button onClick={submitBackground}>Imposta Sfondo</button>
    </div>
  );
};

export default BackgroundSelector;
