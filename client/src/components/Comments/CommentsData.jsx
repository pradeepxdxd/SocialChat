// // import React, { useState } from 'react'
// // import { Button, ListGroup } from 'react-bootstrap'
// // import ReplyComment from './ReplyComment'
// // import { doReplyComment } from '../../redux/thunk/reply'
// // import InfinityScroller from '../InfinityScrollerForComment/InfinityScroller';
// // import './CommentData.css'

// // export default function CommentsData({ comment }) {
// //     const [showReply, setShowReply] = useState(false);

// //     const handleReply = () => {
// //         setShowReply(showReply ? false : true);
// //     }

// //     return (
// //         <div key={comment.id}>
// //             <ListGroup.Item>
// //                 <div>
// //                     <img
// //                         width={50}
// //                         height={50}
// //                         className="mr-3"
// //                         src={comment.userDetails.profileImg}
// //                         alt={'err'}
// //                     />
// //                     <div>
// //                         <h5>{comment.userDetails.name}</h5>
// //                         <p>{comment.comment}</p>
// //                     </div>
// //                 </div>
// //                 <div>
// //                     <Button variant="link" onClick={handleReply}>
// //                         {
// //                             showReply ? <span style={{color:'red'}}>{comment.replyCount} Reply</span> : <span>{comment.replyCount} Reply</span>
// //                         }
// //                     </Button>
// //                 </div>

// //                 {showReply &&
// //                     <InfinityScroller api={doReplyComment} commentId={comment._id} Template={ReplyComment} />
// //                 }
// //             </ListGroup.Item>
// //         </div>
// //     )
// // }



import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import ReplyComment from './ReplyComment';
import { doReplyComment } from '../../redux/thunk/reply';
import InfinityScroller from '../InfinityScrollerForComment/InfinityScroller';
import './CommentData.css';

export default function CommentsData({ comment }) {
    const [showReply, setShowReply] = useState(false);

    const handleReply = () => {
        setShowReply(!showReply);
    };

    return (
        <div key={comment.id} className="comment-data">
            <ListGroup.Item className="comment-item">
                <div className="comment-content">
                    <div className="user-details">
                        <img
                            width={50}
                            height={50}
                            className="rounded-circle user-image mr-3 mb-3"
                            src={comment.userDetails.profileImg}
                            alt="User Profile"
                        />
                        <div className="user-info">
                            <h5>{comment.userDetails.name}</h5>
                            <p>{comment.comment}</p>
                        </div>
                        <div className="reply-button">
                            <button className="btn btn-link user-button" onClick={handleReply}>
                                {showReply ? (
                                    <span style={{ color: 'red' }}>{comment.replyCount} Reply</span>
                                ) : (
                                    <span>{comment.replyCount} Reply</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {showReply && (
                    <InfinityScroller api={doReplyComment} commentId={comment._id} Template={ReplyComment} />
                )}
            </ListGroup.Item>
        </div>
    );
}
