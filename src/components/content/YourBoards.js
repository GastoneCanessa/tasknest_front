import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function YourBoards(props) {

    return (
        <div className="row" >
            <h2>Bacheche</h2>
            {props.boards.map((board, index) => (
                <div className='col-4 px-3' key={board.id || index}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{board.title}</h5>
                            <button type="button" className="btn btn-primary" onClick={() => props.setBoard(board)}>
                                Scegli
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}