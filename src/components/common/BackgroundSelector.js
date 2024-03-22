import React from 'react';
import backgrounds from '../../assets/background'; // Assicurati di inserire il percorso corretto

const BackgroundSelector = () => {
  const selectBackground = async (path) => {
    try {
      // Sostituisci 'your-backend-url' con l'URL effettivo del tuo backend
      const response = await fetch('your-backend-url', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ background: path }),
      });
      const data = await response.json();
      console.log(data); // Gestisci la risposta come preferisci
    } catch (error) {
      console.error('Error selecting background:', error);
    }
  };

  return (
    <div className='row m-5'>
      {Object.entries(backgrounds).map(([id, path]) => (
        <div className='col' key={id} onClick={() => selectBackground(path)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
          <img className='rounded-3' src={path} alt={`Sfondo ${id}`} style={{ width: '300px', height: '180px' }} />
        </div>
      ))}
    </div>
  );
};

export default BackgroundSelector;
