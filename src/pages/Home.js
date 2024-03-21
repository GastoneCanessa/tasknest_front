import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import YourBoardsSide from '../components/sidebarL/YourBoardsSide';
import YourBoards from '../components/content/YourBoards';
import { currentUser } from '../App';
import { useAtom } from 'jotai';
import Board from '../components/content/Board';

export default function Homepage() {
    const [user, setUser] = useAtom(currentUser)
    const [fliker, setFliker] = useState(false);
    const [board, setBoard] = useState({});
    const isBoardEmpty = () => Object.keys(board).length === 0;

    return (
        <div className="row" style={{ minHeight: "92vh" }}>
            <div className="col-2 p-5" style={{ background: "green" }}><YourBoardsSide /></div>
            <div className="col-10 px-5 py-1" style={{ background: "yellow" }}>
            {isBoardEmpty() ? <YourBoards setBoard={setBoard}/> : <Board board={board} /> }
            </div>
            {/* <div className="col-2 p-5" style={{ background: "red" }}>Sidebar Left</div> */}
        </div>
    )
}