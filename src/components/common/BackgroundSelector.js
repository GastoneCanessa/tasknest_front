import React from 'react';
import axios from 'axios';
import backgrounds from '../../assets/background';

const BackgroundSelector = () => {
    const selectBackground = async (id) => {
        try {
            const response = await axios.put('/boards/img',
                { 
                    id:1,
                    imgId: id 
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error selecting background:', error);
        }
    };

    return (
        <div className='row m-5'>
            {Object.entries(backgrounds).map(([id, path]) => (
                <div className='col' key={id} onClick={() => selectBackground(id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                    <img src={path} alt={`Sfondo ${id}`} style={{ width: '300px', height: '180px' }} />
                </div>
            ))}
        </div>
    );
};

export default BackgroundSelector;
