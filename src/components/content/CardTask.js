import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CardTask() {

    const { id } = useParams();
    const [task, setTask] = useState({});

    useEffect(() => {
        axios.get("/tasks/" + id)
            .then((resp) => {
                setTask(resp.data);
            }).catch((error) => {
                if (error.response) {

                    console.error(error.response.data);

                }

            });
    }, [id]);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div className="container form-container px-5 py-3 my-5 col-5 row" style={{ backgroundColor: "#4D5771", borderRadius: "20px" }}>
                    <div className="col">
                        <h3 className="fw-semibold" style={{ color: "white" }}>{task.title}  </h3>
                        <p style={{ color: "red" }}>pulsante per modificare status (da fare)</p>
                        <h5 className="mb-5" style={{ color: "white" }}> Status: {task.state}</h5>
                        <p>Description:</p>
                        <div className="card px-3 py-1 mb-4" style={{ backgroundColor: "burlywood" }}>
                            <p > {task.description}</p>
                            <p style={{ color: "red" }}>pulsante modificare (da fare)</p>
                        </div>

                        <p>Comments:</p>
                        <div className="card px-3 py-1 mb-4" style={{ backgroundColor: "burlywood" }}>
                            {task.comments && task.comments.map((comment) => (
                                <>
                                    <h5>- {comment.author_name}</h5>
                                    <p> {comment.body}</p>
                                    <p style={{ color: "red" }}>pulsante per modificare il commento solo se appartiene all'utente (da fare)</p>
                                </>
                            ))}
                            <p style={{ color: "red" }}>pulsante per aggiungere commenti (da fare)</p>
                        </div>

                        <p>Assigned to:</p>
                        <div>
                            {task.assigned_to && task.assigned_to.map((user) => (
                                <>
                                    <h2>- {user.name}</h2>
                                    <p style={{ color: "red" }}>pulsante per rimuovere partecipante (da fare)</p>
                                </>
                            ))}
                            <p style={{ color: "red" }}>pulsante aggiungere un partecipanten (da fare)(difficile)</p>
                        </div>
                    </div>
                    <div className="col-auto">
                        <p style={{ color: "white" }}>Due to: {task.expired_date}</p>
                    </div>
                </div>
            </div>
        </>
    );
}