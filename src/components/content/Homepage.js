import { Link } from "react-router-dom";
import YourBoardsSide from "../sidebarL/YourBoardsSide";



export default function Homepage() {

    return (
        <>


            <div className=" px-5 py-1" style={{ background: "yellow" }}>
                <h1>Welcome to TaskNest!</h1>
                <Link className="btn  me-2" to="/user/login">Login</Link>
                <Link className="btn  me-2" to="/user/register">Register</Link>
            </div>


        </>
    )

}