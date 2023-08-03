import React, { useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import ReplyComment from './ReplyComment'

export default function CommentsData({ comment }) {
    const [showReply, setShowReply] = useState(false);

    const handleReply = () => {
        setShowReply(showReply ? false : true);
    }

    return (
        <div key={comment.id}>
            <ListGroup.Item>
                <div>
                    <img
                        width={50}
                        height={50}
                        className="mr-3"
                        src={comment.profileImg}
                        alt={comment.name}
                    />
                    <div>
                        <h5>{comment.name}</h5>
                        <p>{comment.content}</p>
                    </div>
                </div>
                <div>
                    {/* Add "Reply" link */}
                    <Button variant="link" onClick={handleReply}>
                        Reply
                    </Button>
                </div>
                {/* Display reply links */}
                {showReply &&
                    comment.replies.map(reply => (
                        <ReplyComment reply={reply} />
                    ))
                }
            </ListGroup.Item>
        </div>
    )
}
