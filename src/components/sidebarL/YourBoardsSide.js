// YourBoardsSide.js
import React, { useState, useEffect } from 'react';
import backgrounds from '../../assets/background';
import NewBoardForm from '../content/NewBoardForm';
import '../sidebarL/Sidebar.css';


export default function YourBoardsSide(props) {
    const [showNewBoardForm, setShowNewBoardForm] = useState(false);

    return (
        <div className="p-3">
            <div className='row'>
                <div className='d-flex my-3'>
                    <div className="col-10 rounded-start d-flex justify-content-center align-items-center" style={{ background: "#8ecdf6" }} onClick={() => window.location.reload()}><h4 className=''>Your boards</h4></div>

                    <div className="col-2 rounded-end d-flex justify-content-center align-items-center" style={{ background: "#ffb6c1" }} onClick={() => setShowNewBoardForm(true)}><h1>+</h1></div>
                </div>
                <hr />
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
