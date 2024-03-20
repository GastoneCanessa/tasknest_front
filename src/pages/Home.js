import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import YourBoardsSide from '../components/sidebarL/YourBoardsSide';
import YourBoards from '../components/content/YourBoards';

export default function Homepage() {
    return (
        <div className="row" style={{minHeight:"92vh"}}>
            <div className="col-2 p-5"style={{background:"green"}}><YourBoardsSide/></div>
            <div className="col-8 p-5" style={{background:"yellow"}}><YourBoards/></div>
            <div className="col-2 p-5" style={{background:"red"}}>Sidebar Left</div>
        </div>
    )
}