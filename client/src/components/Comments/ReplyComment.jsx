import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './css/ReplyComment.css'; // Make sure to adjust the path to your CSS file

export default function ReplyComment({ comment }) {
    return (
        <ListGroup.Item key={comment.id} className="ml-4 reply-comment">
            <div className="comment-container">
                <div className="user-details">
                    <img
                        width={50}
                        height={50}
                        className="rounded-circle user-image"
                        src={comment.userDetails.profileImg}
                        alt={comment.userDetails.name}
                    />
                    <div className="user-info">
                        <h5>{comment.userDetails.name}</h5>
                        <p>{comment.comment}</p>
                    </div>
                </div>
            </div>
        </ListGroup.Item>
    );
}
