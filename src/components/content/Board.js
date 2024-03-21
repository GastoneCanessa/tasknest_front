import axios from "axios";
import { useEffect, useState } from "react";

export default function Board(props) {

    const [board, setBoard] = useState({ my_tasklists: [] });

    useEffect(
        () => {
            axios.get(`/boards/` + props.board.id)
                .then((response) => {
                    setBoard(response.data);
                }).catch((error) => {

                    console.error('Error fetching boards:', error);

                });
        },
        []
    );

    console.log(board);

    return (
        <div>
            <h1>{board.title}</h1>
            <div className="row">
                {
                    board.my_tasklists.map(
                        (list) => (
                            <div key={list.id} className="col p-3">
                                <div className="card p-3">
                                    <p>{list.title}</p>
                                    <p>{list.position}</p>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
