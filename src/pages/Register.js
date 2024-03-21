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
                navigate("/");
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
            <div className="container  form-container col-6 my-4 ">
                <form className="p-4">
                    <div className="mb-3">
                        <label className="form-label">Insert Name</label>
                        <input name="name" type="text" className="form-control" onChange={synchronize} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Insert Email</label>
                        <p className='small-descr'>At least 8 characters,min 1 MAIUSC, 1 minusc, 1 number, 1 special char</p>
                        <input name="email" type="email" className="form-control" aria-describedby="emailHelp" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Insert Password</label>
                        <input name="password" type="password" className="form-control" onChange={synchronize} />
                    </div>

                    <div className="d-flex justify-content-center">
                        <input className="btn btn-dark" type="button" onClick={sendRegistration} value="Register" />
                    </div>
                </form>
            </div>

            {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
        </>
    )
}