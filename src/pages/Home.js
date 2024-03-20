import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Homepage() {
    return (
        <div className="row ">
            <div className="col-2"style={{background:"green"}}>Sidebar</div>
            <div className="col-8" style={{background:"yellow"}}>Contenuto</div>
            <div className="col-2" style={{background:"red"}}>Sidebar Left</div>
        </div>
    )
}