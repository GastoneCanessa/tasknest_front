// YourBoardsSide.js
import React, { useState, useEffect } from 'react';
import backgrounds from '../../assets/background';
import NewBoardForm from '../content/NewBoardForm';
import '../sidebarL/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function YourBoardsSide(props) {
    const [showNewBoardForm, setShowNewBoardForm] = useState(false);

    return (
        <div className="p-3">
            <div className='row'>
                <div className=''>
                    <div className="yb-title" onClick={() => window.location.reload()}><h4 >Your boards</h4></div>
                </div>
                <hr />
            </div>
            <div className='nb-button' onClick={() => setShowNewBoardForm(true)} >
                <FontAwesomeIcon icon={faPlus} />
                <h5 style={{ color: "white" }}>New board</h5>
            </div>
            <div className='px-3'>
                {props.boards.map((board, index) => (
                    <div className='d-flex align-items-center' key={board.id || index} >
                        <div className="my-2 me-3 rounded-1"
                            onClick={() => props.setBoard(board)}
                            style={{
                                backgroundImage: `url(${backgrounds[board.img]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '3.5vh',
                                width: '2.5vw',
                                cursor: 'pointer'
                            }}>
                        </div>
                        <div className='text-light'>
                            <h6> {board.title}</h6>
                        </div>
                    </div>
                ))}
            </div>
            {showNewBoardForm && <NewBoardForm onClose={() => setShowNewBoardForm(false)} onBoardAdded={props.handleNewBoardAdded} />}
        </div>
    );
}
