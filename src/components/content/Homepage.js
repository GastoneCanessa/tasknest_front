import { Link } from "react-router-dom";
import YourBoardsSide from "../sidebarL/YourBoardsSide";



export default function Homepage() {

    return (
        <>

            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="homepage-title mb-5">
                    <h1 >Welcome to Task</h1>
                    <h2 >Nest</h2>
                    <h1 >!</h1>
                </div>
                <Link className="home-btn " to="/user/login">Login</Link>
                <Link className="home-btn" to="/user/register">Register</Link>
            </div>


        </>
    )

}