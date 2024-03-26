import React, { useState, useEffect } from 'react';
import backgrounds from '../../assets/background';

export default function YourBoards(props) {

    return (
        <div className="row" >
            <h2>Bacheche</h2>
            {props.boards.map((board, index) => (
                <div className='col-4 px-3' key={board.id || index} >
                    <div className="card m-3"
                        onClick={() => props.setBoard(board)}
                        style={{
                            backgroundImage: `url(${backgrounds[board.img]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            minHeight: '20vh'
                        }}>
                        <div className="card-body">
                            <h5 className="card-title text-light">{board.title}</h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}