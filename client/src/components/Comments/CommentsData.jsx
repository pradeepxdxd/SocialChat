import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import ReplyComment from './ReplyComment';
import { getReplyComment } from '../../redux/thunk/reply';
import InfinityScroller from '../InfinityScrollerForComment/InfinityScroller';
import './css/CommentData.css';
import { checkFlag, getIds } from '../../redux/slices/replyFlagSlices'

export default function CommentsData({ comment, incReplyComment }) { 
    const [showReply, setShowReply] = useState(false);

    const dispatch = useDispatch();

    const replyComment = useMemo(() => {
        if (incReplyComment){
            return comment.replyCount + 1
        }
        else{
            // eslint-disable-next-line no-unused-expressions
            comment.replyCount
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incReplyComment])

    const handleReply = () => {
        if (!showReply) {
            dispatch(checkFlag(true));
            dispatch(getIds({commentId : comment._id, postId : comment.postId, posterId : comment.posterId}));
        }
        else {
            dispatch(checkFlag(false));
        }
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
                                    // <span style={{ color: 'red' }}>{ incReplyComment ? comment.replyCount + 1 : comment.replyCount } Reply</span>
                                    <span style={{ color: 'red' }}>{ replyComment ? replyComment : comment.replyCount } Reply</span>
                                ) : (
                                    // <span>{comment.replyCount} Reply</span>
                                    <span>{replyComment ? replyComment : comment.replyCount} Reply</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {showReply && (
                    <InfinityScroller api={getReplyComment} commentId={comment._id} Template={ReplyComment} />
                )}
            </ListGroup.Item>
        </div>
    );
}
