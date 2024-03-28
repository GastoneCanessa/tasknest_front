import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currentUser } from '../../App';


export default function CardTask() {

    const { id } = useParams();
    const [user, setUser] = useAtom(currentUser);
    const [task, setTask] = useState({});
    const [showTextBox, setShowTextBox] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentIndex, setCommentIndex] = useState(-1);
    const [newTask, setNewTask] = useState(
        {
            id: id,
            description: task.description
        }
    )
    const [modifiedComm, setModifiedComm] = useState(
        {
            author_id: user.id,
            body: "",
            id: ""
        }
    )
    const [newComment, setNewComment] = useState(
        {
            author_id: user.id,
            body: "",
            task_id: id
        }
    );

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

    function handleInputChange(event) {

        let clone = { ...newComment };
        clone['body'] = event.target.value;
        setNewComment(clone);
    };

    function handleDescriptionChange(event) {

        let clone = { ...newTask };
        clone['description'] = event.target.value;
        setNewTask(clone);
    }

    function handleCommentChange(event, id) {
        console.log("Nuovo valore dell'input:", event.target.value);
        console.log("ID del commento:", id);

        let clone = { ...modifiedComm };
        clone['body'] = event.target.value;
        clone['id'] = id;
        console.log("Stato clonato:", clone);
        setModifiedComm(clone);
    }


    function addComment(event) {
        event.preventDefault(); // Impedisce il comportamento predefinito del modulo
        axios.post("/comments", newComment)
            .then(response => {

                setTask(prevTask => ({
                    ...prevTask,
                    comments: [...prevTask.comments, response.data]
                }));

                setNewComment({
                    author_id: user.id,
                    body: "",
                    task_id: id
                });
            })
            .catch(error => {
                console.error(error.response.data);
            });
    }

    function sendComment(event) {

        event.preventDefault();
        axios.put("/comments", modifiedComm)
            .then(response => {

                setTask(prevTask => ({
                    ...prevTask,
                    comments: [...prevTask.comments, response.data]
                }));

                setModifiedComm({
                    author_id: user.id,
                    body: "",
                    id: ""
                });

                setCommentIndex(-1);
            })
            .catch(error => {
                console.error(error.response.data);
            });
        toggleCommentBox();
    }

    function addDescription(event) {
        event.preventDefault();
        axios.put("/tasks/description", newTask)
            .then(response => {

                const updatedTask = {
                    ...task,
                    description: response.data.description
                };

                setTask(updatedTask);

                setNewTask({
                    id: id,
                    description: updatedTask.description
                });
            })
            .catch(error => {
                console.error(error.response.data);
            });
        toggleTextBox();
    }

    function toggleTextBox() {

        setShowTextBox(!showTextBox);
    }

    function toggleCommentBox() {

        setShowCommentBox(!showCommentBox);
    }

    function setIndex(ind) {
        setCommentIndex(ind);
    }


    function textBox() {
        return (
            <form onSubmit={addDescription}>
                <input
                    type="text"
                    name="description"
                    onChange={handleDescriptionChange}
                    placeholder={task.description}
                    style={{ backgroundColor: "#2C3240", color: "#DCDCDC", width: "100%" }}
                    className="card p-2 mb-2"
                />
                <button type="submit" className="btn me-2" style={{ background: "#8492B4" }} >Send</button>
                <button className="btn text-decoration-underline " onClick={toggleTextBox}>Back</button>
            </form>
        );
    }

    function commentForm(comment) {
        return (
            <>
                <div className="mb-2">
                    <div className="d-flex justify-content-between">

                        <h5 className="fw-semibold ">{comment.author_name} </h5>
                        <p style={{ marginBottom: 0 }}>at {comment.made_at}</p>
                    </div>
                </div>
                <form onSubmit={sendComment}>
                    <input
                        type="text"
                        name="description"
                        onChange={(event) => handleCommentChange(event, comment.id)}
                        placeholder=""
                        style={{ backgroundColor: "#2C3240", color: "#DCDCDC", width: "100%" }}
                        className="card p-2 mb-2"
                    />

                    <button type="submit" className="btn me-2" style={{ background: "#8492B4" }} >Send</button>
                    <button className="btn text-decoration-underline " onClick={() => { toggleCommentBox(); setCommentIndex(-1); }}>Back</button>
                </form>
            </>
        );
    }

    function deleteComment(id) {

        axios.delete("/comments/" + id)
            .then(response => {
                setTask(prevTask => ({
                    ...prevTask,
                    comments: prevTask.comments.filter(comment => comment.id !== id)
                }));
            }
            ).catch(error => {
                console.error(error.response.data);
            });
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div className="container form-container px-4 py-3 my-5 col-6 row" style={{ backgroundColor: "#4D5771", borderRadius: "20px" }}>
                    <div className="col">
                        <h3 className="fw-semibold" style={{ color: "#DCDCDC" }}>{task.title}  </h3>

                        <div className="d-flex mb-4">
                            <h5 className="fw-light me-3" style={{ color: "#DCDCDC" }}> Status: </h5>
                            <h5 className="fw-semibold" style={{ color: "#DCDCDC" }}>{task.state}</h5>
                        </div>

                        <h5 style={{ color: "#DCDCDC" }} className="fw-semibold">Description:</h5>

                        {showTextBox ? textBox() :
                            <>
                                <div className="card px-3 py-1 " style={{ backgroundColor: "#2C3240" }}>
                                    <p style={{ color: "#DCDCDC" }}> {task.description}</p>
                                </div>
                                <button className="btn text-decoration-underline mb-4 p-0" onClick={toggleTextBox} >Modify</button>
                            </>
                        }



                        <h5 style={{ color: "#DCDCDC" }} className="fw-semibold" p>Assigned to:</h5>
                        <div className="mb-4">
                            {task.assigned_to && task.assigned_to.map((username) => (
                                <>
                                    <h5>- {username}</h5>

                                </>
                            ))}

                        </div>

                        <h5 style={{ color: "#DCDCDC" }} className="fw-semibold">Comments:</h5>
                        <div className=" px-3 py-1 mb-4">
                            {task.comments && task.comments.map((comment) => comment.id == commentIndex ?
                                <>

                                    {commentForm(comment)}
                                </>
                                :
                                <>
                                    <div className="mb-2">
                                        <div className="d-flex justify-content-between">

                                            <h5 className="fw-semibold ">{comment.author_name} </h5>
                                            <p style={{ marginBottom: 0 }}>at {comment.made_at}</p>
                                        </div>
                                        <div className="card  p-2" style={{ backgroundColor: "#2C3240", color: "#DCDCDC" }}>
                                            <p> {comment.body}</p>
                                        </div>
                                        {comment.author_id == user.id &&
                                            <>
                                                <button className="btn text-decoration-underline mb-2 p-0 me-3" onClick={() => deleteComment(comment.id)}>Delete</button>
                                                <button className="btn text-decoration-underline mb-2 p-0" onClick={() => { toggleCommentBox(); setIndex(comment.id); }}>Modify</button>
                                            </>
                                        }
                                    </div >
                                </>
                            )}



                            <form onSubmit={addComment}>
                                <h5 className="fw-semibold ">{user.name} </h5>
                                <input type="text" name="body" value={newComment.body} onChange={handleInputChange} placeholder="Write something..." style={{ backgroundColor: "#2C3240", color: "#DCDCDC", width: "100%" }} className="card p-2 mb-2" />
                                <button type="submit" className="btn" style={{ background: "#8492B4" }} >Send</button>
                            </form>

                        </div >


                    </div>
                    <div className="col-auto">
                        <p style={{ color: "white" }}>Due to: {task.expired_date}</p>
                    </div>
                </div>
            </div >
        </>
    );
}