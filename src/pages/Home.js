import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Homepage() {
    return (
        <div className="row" style={{minHeight:"92vh"}}>
            <div className="col-2 p-5"style={{background:"green"}}>Sidebar</div>
            <div className="col-8 p-5" style={{background:"yellow"}}>Contenuto</div>
            <div className="col-2 p-5" style={{background:"red"}}>Sidebar Left</div>
        </div>
    )
}