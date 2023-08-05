import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import CommentsData from './CommentsData';
import InfinityScroller from '../InfinityScrollerForComment/InfinityScroller'
import { getComments } from '../../redux/thunk/comment'
import { useSelector, useDispatch } from 'react-redux';
import { checkFlag } from '../../redux/slices/replyFlagSlices';
import { doComment } from '../../redux/thunk/comment'
import { doReplyComment } from '../../redux/thunk/reply'
import './css/Comment.css'

export default function Comment({ show, setShow, postId, posterId }) {
    const [userComment, setUserComment] = useState('');
    const [incReplyComment, setIncRplyComment] = useState(false);

    const replyFlag = useSelector(state => state.replyFlag);

    const dispatch = useDispatch();

    const handleSend = () => {
        if (!replyFlag.flag) {
            // comment on post
            console.log(userComment, 'ui')
            dispatch(doComment({ posterId, postId, data : userComment }));
        }
        else {
            setIncRplyComment(true);
            dispatch(doReplyComment({ postId, posterId, commentId : replyFlag.commentId, data : userComment }));
        }
        dispatch(checkFlag(false));
    }

    const handleHide = () => {
        dispatch(checkFlag(false));
        setShow(false)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Comments
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <div>
                        <InfinityScroller api={getComments} limit={3} postId={postId} Template={CommentsData} incReplyComment={incReplyComment} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="comment-input-container">
                        <input type='text' placeholder="Enter your comment" className="comment-input" onChange={e => setUserComment(e.target.value)} required />
                        <Button variant="primary" onClick={handleSend} className="comment-send-button">
                            <FontAwesomeIcon icon={faPaperPlane} /> Send
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
