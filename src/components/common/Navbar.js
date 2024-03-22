import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import { currentUser } from "../../App";
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(currentUser);
    const isUserNotEmpty = Object.keys(user).length > 0;

    function logOut() {
        setUser({});
        localStorage.setItem('user', JSON.stringify({}));
        navigate("/");
    }


    return (
        <div className="" style={{ background: "pink" }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!isUserNotEmpty ? (
                                <>
                                    <a className="navbar-brand" href="/">TaskNest</a>
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </>
                            ) : (
                                <>
                                    <a className="navbar-brand" href="/user/home">TaskNest</a>
                                    <a className="nav-link active" aria-current="page" href="/user/home">Home</a>
                                </>
                            )}
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>

                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        {!isUserNotEmpty ? (
                            <Link className="nav-link  fst-italic fw-semibold fs-5 login-link" to="user/login">Login</Link>
                        ) : (
                            <>
                                <button className="nav-link  fst-italic fw-semibold fs-5 login-link" onClick={logOut}>Log Out</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;