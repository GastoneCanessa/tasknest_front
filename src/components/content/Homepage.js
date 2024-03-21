import { Link } from "react-router-dom";
import YourBoardsSide from "../sidebarL/YourBoardsSide";



export default function Homepage() {

    return (
        <>

            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

                <h1 className="mb-5 fw-bold">Welcome to TaskNest!</h1>
                <Link className="btn  mb-2 mt-5 fw-lighter fs-4" style={{ background: "#4D5771", color: "white", width: "20vh" }} to="/user/login">Login</Link>
                <Link className="btn  my-2 fw-lighter fs-4" style={{ background: "#4D5771", color: "white", width: "20vh" }} to="/user/register">Register</Link>
            </div>


        </>
    )

}