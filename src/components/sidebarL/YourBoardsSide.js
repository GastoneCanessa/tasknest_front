// YourBoardsSide.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewBoardForm from '../content/NewBoardForm';


export default function YourBoardsSide(props) {
    const [showNewBoardForm, setShowNewBoardForm] = useState(false);

    return (
        <div className="">
            <div className='row'>
                <div className="col-10 btn btn-danger" onClick={() => window.location.reload()}><h5>Le tue bacheche</h5></div>
                <div className="col-2 btn btn-warning" onClick={() => setShowNewBoardForm(true)}><h1>+</h1></div>
            </div>
            {props.boards.map((board, index) => (
                <div key={board.id || index}>
                    {board.title}
                </div>
            ))}
            {showNewBoardForm && <NewBoardForm onClose={() => setShowNewBoardForm(false)} onBoardAdded={props.handleNewBoardAdded} />}
        </div>
    );
}
