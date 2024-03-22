// YourBoardsSide.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewBoardForm from '../content/NewBoardForm';


export default function YourBoardsSide() {
    const [boards, setBoards] = useState([]);
    const [showNewBoardForm, setShowNewBoardForm] = useState(false);

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = () => {
        axios.get(`/boards/user/1`)
            .then((response) => {
                setBoards(response.data);
            }).catch((error) => {
                console.error('Error fetching boards:', error);
            });
    };

    const handleNewBoardAdded = () => {
        fetchBoards(); // Riaggiorna le bacheche dopo averne aggiunta una nuova
    };

    return (
        <div className="">
            <div className='row'>
                <div className="col-10 btn btn-danger" onClick={() => window.location.reload()}><h5>Le tue bacheche</h5></div>
                <div className="col-2 btn btn-warning" onClick={() => setShowNewBoardForm(true)}><h1>+</h1></div>
            </div>
            {boards.map((board, index) => (
                <div key={board.id || index}>
                    {board.title}
                </div>
            ))}
            {showNewBoardForm && <NewBoardForm onClose={() => setShowNewBoardForm(false)} onBoardAdded={handleNewBoardAdded} />}
        </div>
    );
}
