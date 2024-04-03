import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUser } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Register() {

    const [user, setUser] = useAtom(currentUser);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        email: "",
        password: "",
        name: ""
    });

    function synchronize(e) {

        const { name, value } = e.target;
        setRegistrationData((oldData) => ({
            ...oldData,
            [name]: value,
        }));
    }

    function sendRegistration() {

        axios.post("/user/register", registrationData)
            .then((response) => {
                setUser(response.data);
                navigate("/user/home");
            })
            .catch((error) => {
                if (error.response) {

                    setErrorMessage(error.response.data);
                    setShowErrorPopup(true);
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
                <div className="container form-container d-flex flex-column justify-content-center align-items-center p-4 my-5 col-5" style={{ backgroundColor: "#45547B", borderRadius: "20px", height: "60vh" }}>
                    <h2 style={{ color: '#40d3fb' }}>Create a new account</h2>
                    <form className="p-4" style={{ width: "60vh" }}>
                        <div className="mb-3">
                            <label className="form-label fs-3 fw-lighter" style={{ color: "white" }}>Name</label>
                            <input name="name" type="text" className="form-control" placeholder="Insert name..." onChange={synchronize} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fs-3 fw-lighter" style={{ color: "white" }}>Email</label>
                            <input name="email" type="email" className="form-control" placeholder="Insert email..." aria-describedby="emailHelp" onChange={synchronize} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fs-3 fw-lighter" style={{ color: "white" }}>Password</label>
                            <input name="password" type="password" className="form-control " placeholder="Insert password..." onChange={synchronize} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <input className="log-button" style={{ width: "15vh" }} type="button" onClick={sendRegistration} value="Register" />
                        </div>
                    </form>
                </div>
            </div>

            {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
        </>
    )
}