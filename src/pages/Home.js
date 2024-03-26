import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import YourBoardsSide from '../components/sidebarL/YourBoardsSide';
import YourBoards from '../components/content/YourBoards';
import { currentUser } from '../App';
import { useAtom } from 'jotai';
import Board from '../components/content/Board';
import axios from 'axios';
import backgrounds from '../assets/background';

export default function Home() {
    const [user, setUser] = useAtom(currentUser)
    const [fliker, setFliker] = useState(false);
    const [board, setBoard] = useState({});
    const isBoardEmpty = () => Object.keys(board).length === 0;

    const [boards, setBoards] = useState([]);

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
        <div className="row" style={{ minHeight: "92vh" }}>
            <div className="col-2 p-3" style={{ background: "#cdc0d7" }}><YourBoardsSide boards={boards} setBoard={setBoard} handleNewBoardAdded={handleNewBoardAdded} /></div>

            {isBoardEmpty() ? 
            <div className="col-10 py-3 px-5 py-1" ><YourBoards setBoard={setBoard} boards={boards} /> </div>
            : 
            <div className="col-10 py-3 px-5 py-1" style={{backgroundImage:`url(${backgrounds[board.img]})`,  backgroundSize: 'cover', backgroundPosition: 'center'}}><Board board={board} /></div>
            }
        </div>
    )
}