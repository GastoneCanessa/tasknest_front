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
                navigate("/");
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
            <div className="row mt-5">
                <div className="justify-content-center " >
                    <div className="container form-container p-4 my-5 col-5">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input name="email" type="email" className="form-control" value={login.mail} onChange={synchronize} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input name="password" type="password" className="form-control" value={login.password} onChange={synchronize} />
                            </div>

                            {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
                            <div className="text-center">
                                <input className="btn" type="button" onClick={sendForm} value="Login" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}