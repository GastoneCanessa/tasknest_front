import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import { currentUser } from "../../App";
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircle } from "@fortawesome/free-solid-svg-icons";

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
        <div className="" style={{ background: "#45547B" }}>
            <nav className="navbar navbar-expand-lg navbar-light " style={{ height: '5vh' }}>
                <div className="container-fluid">
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!isUserNotEmpty ? (
                                <>
                                    <a className="navbar-brand d-flex ms-3" href="/"><h4 style={{ color: '#EAEBED' }}>Task</h4><h4 style={{ color: '#40d3fb' }}>Nest</h4></a>
                                    {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
                                </>
                            ) : (
                                <>
                                    <a className="navbar-brand d-flex ms-3" href="/user/home"><h4 style={{ color: '#EAEBED' }}>Task</h4><h4 style={{ color: '#40d3fb' }}>Nest</h4></a>
                                    {/* <a className="nav-link active" aria-current="page" href="/user/home">Home</a> */}
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



                        {!isUserNotEmpty ? (
                            <Link className="nav-link  fst-italic fw-semibold fs-5 login-link" style={{ color: '#EAEBED' }} to="user/login">Login</Link>
                        ) : (
                            <div className="d-flex justify-content-between me-4" style={{ width: '15vw' }}>
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faCircle} className="me-2 " style={{ color: '#40d3fb' }} />
                                    <h5 style={{ color: '#EAEBED', margin: '0' }}>{user.name}</h5>
                                </div>
                                <button className="nav-link d-flex  align-items-center fst-italic fw-semibold fs-5 login-link" onClick={logOut} style={{ color: '#EAEBED' }}><FontAwesomeIcon icon={faArrowRightFromBracket} /><h5 className="ms-2" style={{ margin: '0' }}>Log Out</h5></button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;