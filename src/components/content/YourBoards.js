import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function YourBoards() {
    const [boards, setBoards] = useState([]);

    useEffect(
        () => {
            axios.get(`/boards/user/1`)
                .then((response) => {
                    setBoards(response.data);
                }).catch((error) => {

                    console.error('Error fetching boards:', error);

                });
        },
        []
    );

    return (
        <div className="row" >
            <h2>Bacheche</h2>
            {boards.map((board, index) => (
                <div className='col-4 px-3' key={board.id || index}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{board.title}</h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}