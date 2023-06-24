import React, { useState } from 'react'
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";

export default function AllTodos({ todo }) {
    let [incLike, setIncLike] = useState(0);
    const [likeColor, setLikeColor] = useState('blue');

    const handleLike = () => {
        setLikeColor('red');
        setIncLike(incLike = incLike + 1);
    }

    return (
        <>
            <blockquote className="quote text-center mt-5">
                <p>
                    {todo.message}
                </p>
                <cite> Title : {todo.title}</cite>
                <Button variant="link" className="like-button" onClick={handleLike} style={{color:`${likeColor}`}}>
                    <FontAwesomeIcon icon={faThumbsUp} /><span className='mx-1'>{incLike}</span>
                </Button>
                <Button variant="link" className="comment-icon" >
                    <FontAwesomeIcon icon={faComment} />
                </Button>
            </blockquote>
        </>
    )
}
