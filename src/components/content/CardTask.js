import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentUser } from '../../App';
import '../content/content.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function CardTask() {

    const { id } = useParams();
    const navigate = useNavigate();
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
    );
    const [modifiedComm, setModifiedComm] = useState(
        {
            author_id: user.id,
            body: "",
            id: "",
            author_name: user.name,
            made_at: ""
        }
    );
    const [newComment, setNewComment] = useState(
        {
            author_id: user.id,
            body: "",
            task_id: id
        }
    );
    const [userToRemove, setUserToRemove] = useState(
        {
            id: "",
            user_id: ""
        }
    );
    const [userToAdd, setUserToAdd] = useState(
        {
            id: "",
            email: ""
        }
    )

    const [dueTO, setDueTo] = useState(
        {
            id: "",
            dueTo: ""
        }
    )

    function getTasks() {
        axios.get("/tasks/" + id)
            .then((resp) => {
                setTask(resp.data);
            }).catch((error) => {
                if (error.response) {

                    console.error(error.response.data);

                }

            });
    }

    useEffect(() => {
        getTasks();
    }, [id]);

    function handleInputChange(event) {

        let clone = { ...newComment };
        clone['body'] = event.target.value;
        setNewComment(clone);
    };

    function handleChangeAddTo(event) {

        let clone = { ...dueTO };
        clone['id'] = task.id;
        clone['dueTo'] = event.target.value;
        setDueTo(clone);
    };

    function handleAddUser(event) {

        let clone = { ...userToAdd };
        clone['id'] = task.id;
        clone['email'] = event.target.value;
        setUserToAdd(clone);
    };

    function handleDescriptionChange(event) {

        let clone = { ...newTask };
        clone['description'] = event.target.value;
        setNewTask(clone);
    };

    function handleRemoveUser(id) {

        let clone = { ...userToRemove };
        clone['id'] = task.id;
        clone['user_id'] = id;
        setUserToRemove(clone);
        removeUser(clone);
    };


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
                    id: "",
                    author_name: user.name,
                    made_at: ""

                });

                setCommentIndex(-1);
                getTasks();
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
                <button type="submit" className="button-light me-2" >Send</button>
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
                        // placeholder={modifiedComm.body}
                        value={modifiedComm.body}
                        style={{ backgroundColor: "#2C3240", color: "#DCDCDC", width: "100%" }}
                        className="card p-2 mb-2"
                    />

                    <button type="submit" className="button-light me-2" >Send</button>
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

    function removeUser(userToRem) {

        axios.put("/tasks/removeuser", userToRem)
            .then(response => {
                setTask(prevTask => ({
                    ...prevTask,
                    assigned_to: [...prevTask.assigned_to, response.data]
                }));
                setUserToRemove(
                    {
                        id: "",
                        user_id: ""
                    }
                );
                getTasks();
            }
            ).catch(error => {
                console.error(error.response.data);
            });
    }

    function addUser(event) {

        event.preventDefault();
        axios.put("/tasks/adduser", userToAdd)
            .then(response => {
                setTask(prevTask => ({
                    ...prevTask,
                    assigned_to: [...prevTask.assigned_to, response.data]
                }));
                setUserToAdd(
                    {
                        id: "",
                        email: ""
                    }
                );
                getTasks();
            }
            ).catch(error => {
                console.error(error.response.data);
            });
    }

    function addDueTo(event) {

        event.preventDefault();
        console.log(dueTO);
        axios.put("/tasks/dueTo", dueTO)
            .then(response => {
                setTask(prevTask => ({
                    ...prevTask,
                    assigned_to: [...prevTask.assigned_to, response.data]
                }));
                getTasks();
            }
            ).catch(error => {
                console.error(error.response.data);
            });
    }
    function exit() {
        navigate("/user/home")
    }


    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div className="container form-container  py-3 my-5 col-6 row" style={{ backgroundColor: "#515f82", borderRadius: "20px" }}>
                    <div className="col-auto">
                        <button type="button" className='close-button' onClick={exit} ><FontAwesomeIcon icon={faXmark} className='fs-3' /></button>
                    </div>
                    <div className="col">
                        <h3 className="title" style={{ color: '#40d3fb' }} >{task.title}  </h3>

                        <div className="d-flex mb-4">
                            <h5 className=" me-2" > Status: </h5>
                            <h5 className="fw-semibold" style={{ color: "#EAEBED" }}>{task.state}</h5>
                        </div>

                        <h5 style={{ color: "#EAEBED" }} className="fw-semibold">Description:</h5>

                        {showTextBox ? textBox() :
                            <>
                                <div className="card px-3 py-1 " style={{ backgroundColor: "#2C3240" }}>
                                    <p style={{ color: "#EAEBED" }}> {task.description}</p>
                                </div>
                                <button className="btn text-decoration-underline mb-4 p-0" onClick={toggleTextBox} >Modify</button>
                            </>
                        }



                        <h5 style={{ color: "#EAEBED" }} className="fw-semibold" p>Assigned to:</h5>
                        <div className="mb-4">
                            {task.assigned_to && task.assigned_to.map((u) => (
                                <div className="d-flex">
                                    <h5 style={{ color: '#40d3fb' }} className="me-2">•</h5>
                                    <h5>{u.name}</h5>
                                    <button className="btn text-decoration-underline mb-2 ms-3 p-0" onClick={() => handleRemoveUser(u.id)} >Remove</button>
                                </div>
                            ))}
                            <form onSubmit={addUser}>
                                <h5 className="fw-semibold mt-4 ">Add participant </h5>
                                <input type="text" name="email" onChange={handleAddUser} placeholder="Insert email" style={{ backgroundColor: "#2C3240", color: "#DCDCDC", width: "100%" }} className="card p-2 mb-2" />
                                <button type="submit" className="button-light " >Add</button>
                            </form>
                        </div>

                        <h5 style={{ color: "#EAEBED" }} className="fw-semibold" p>Due to:</h5>
                        <div className="mb-4">
                            <form onSubmit={addDueTo}>
                                <h5 className="fw-semibold ">Mod date </h5>
                                <input type="date" name="addTo" value={dueTO.dueTo} onChange={handleChangeAddTo} style={{ backgroundColor: "#2C3240", color: "#DCDCDC", width: "100%" }} className="card p-2 mb-2" />
                                <button type="submit" className="button-light " >Add</button>
                            </form>
                        </div>

                        <h5 style={{ color: "#EAEBED" }} className="fw-semibold">Comments:</h5>
                        <div className=" px-3 py-1 mb-4">
                            {task.comments && task.comments.map((comment) => comment.id == commentIndex ?
                                <>

                                    {commentForm(comment)}
                                </>
                                :
                                <>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <h5 style={{ color: '#40d3fb' }} className="me-2">•</h5>
                                                <h5 className="fw-semibold ">{comment.author_name} </h5>
                                            </div>
                                            <p style={{ marginBottom: 0 }}>at {comment.made_at}</p>
                                        </div>
                                        <div className="card  p-2" style={{ backgroundColor: "#2C3240", color: "#EAEBED" }}>
                                            <p> {comment.body}</p>
                                        </div>
                                        {comment.author_id == user.id &&
                                            <>
                                                <button className="btn text-decoration-underline mb-2 p-0 me-3" style={{}} onClick={() => deleteComment(comment.id)}>Delete</button>
                                                <button className="btn text-decoration-underline mb-2 p-0" onClick={() => { toggleCommentBox(); setIndex(comment.id); setModifiedComm({ ...comment }); }}>Modify</button>
                                            </>
                                        }
                                    </div >
                                </>
                            )}



                            <form onSubmit={addComment}>
                                <h5 className="fw-semibold ">{user.name} </h5>
                                <input type="text" name="body" value={newComment.body} onChange={handleInputChange} placeholder="Write something..." style={{ backgroundColor: "#2C3240", color: "#DCDCDC", width: "100%" }} className="card p-2 mb-2" />
                                <button type="submit" className="button-light">Send</button>
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