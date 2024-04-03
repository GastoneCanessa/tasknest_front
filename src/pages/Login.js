import { useState } from "react";
import { currentUser } from "../App"
import { useAtom } from "jotai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Login() {

    const [user, setUser] = useAtom(currentUser);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [login, setLogin] = useState(
        {
            email: "",
            password: ""
        }
    );

    function synchronize(e) {

        let clone = { ...login };
        clone[e.target.name] = e.target.value;
        setLogin(clone);
    }

    function sendForm() {
        axios.post("/user/login", login)
            .then((response) => {

                setUser(response.data);
                navigate("/user/home");
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status == 401) {
                        setErrorMessage("Invalid credentials. Please check your mail and password.");
                    } else if (error.response.status == 404) {
                        setErrorMessage("Account not found. Please check the mail.");
                    } else {
                        setErrorMessage("Invalid credentials. Please check your mail and password.");
                    }
                    setShowErrorPopup(true);
                } else {
                    console.error("An error occurred while logging in:", error);
                }
            });
    }

    function ErrorPopup({ message, onClose }) {
        return (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog mt-10" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">Error</h5>
                            <FontAwesomeIcon className="btn btn-outline-secondary" icon={faXmark} onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>

            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div className="container form-container d-flex flex-column justify-content-center align-items-center p-4 my-5" style={{ backgroundColor: "#45547B", borderRadius: "20px", height: "45vh", width: '35vw' }}>
                    <div className="mb-3 text-center">
                        <h2 style={{ color: '#40d3fb' }}>Enter with an existing account</h2>
                    </div>
                    <form style={{ width: "60%" }}>
                        <div className="mb-3">
                            <label className="form-label fs-3 fw-lighter" style={{ color: "white" }}>Email</label>
                            <input name="email" type="email" className="form-control" placeholder="Enter email..." style={{ width: "100%" }} value={login.mail} onChange={synchronize} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fs-3 fw-lighter" style={{ color: "white" }}>Password</label>
                            <input name="password" type="password" className="form-control" placeholder="Enter password..." style={{ width: "100%" }} value={login.password} onChange={synchronize} />
                        </div>

                        {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
                        <div className="d-flex justify-content-center">
                            <input className="log-button" type="button" onClick={sendForm} value="Login" />
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}