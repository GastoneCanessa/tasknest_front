// YourBoardsSide.js
import React, { useState, useEffect } from 'react';
import backgrounds from '../../assets/background';
import NewBoardForm from '../content/NewBoardForm';


export default function YourBoardsSide(props) {
    const [showNewBoardForm, setShowNewBoardForm] = useState(false);

    return (
        <div className="">
            <div className='row'>
                <div className="col-10 btn btn-danger" onClick={() => window.location.reload()}><h5>Le tue bacheche</h5></div>
                <div className="col-2 btn btn-warning" onClick={() => setShowNewBoardForm(true)}><h1>+</h1></div>
            </div>
            <div className='mt-2'>
                {props.boards.map((board, index) => (
                    <div className='d-flex ' key={board.id || index} >
                        <div className="my-1 me-2 rounded-1"
                            onClick={() => props.setBoard(board)}
                            style={{
                                backgroundImage: `url(${backgrounds[board.img]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '4vh',
                                width: '3vw'
                            }}>
                        </div>
                        <div className='text-light'>
                            {board.title}
                        </div>
                    </div>
                ))}
            </div>
            {showNewBoardForm && <NewBoardForm onClose={() => setShowNewBoardForm(false)} onBoardAdded={props.handleNewBoardAdded} />}
        </div>
    );
}
