import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function YourBoardsSide() {
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
        <div className="">
            <h5>Le tue bacheche</h5>
            {boards.map((board, index) => (
            <div key={board.id || index}> 
                {board.title}
            </div>
        ))}
        </div>
    )
}