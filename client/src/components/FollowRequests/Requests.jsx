import React from 'react'
import { ListGroup } from 'react-bootstrap'
import './css/Requests.css';
import { accpetRequest, rejectRequest } from '../../redux/thunk/followRequest'
import { useDispatch } from 'react-redux'
import { requestAccepted, refreshCount } from '../../redux/slices/friendSlices'
import { useNavigate } from 'react-router-dom';
import Verified from '../Template/Verified';

export default function Requests({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAccept = () => {
        dispatch(accpetRequest(user));
        dispatch(requestAccepted(user));
        dispatch(refreshCount());
    }

    const handleReject = () => {
        dispatch(rejectRequest(user));
        dispatch(refreshCount());
    }

    const handleClickOnProfile = () => {
        navigate(`/follower/${user.friend._id}`);
    }

    return (
        <>
            <div key={user._id} className="comment-data">
                <ListGroup.Item className="comment-item">
                    <div className="comment-content">
                        <div className="user-details">
                            <img
                                width={50}
                                height={50}
                                className="rounded-circle user-image mr-3 mb-3"
                                src={user.friend.profileImg}
                                alt="User Profile"
                                onClick={handleClickOnProfile}
                            />
                            <div className="user-info">
                                <h5>{user.friend.name}<span>{user.friend.verified === true && <Verified />}</span></h5>
                            </div>
                            <div className="reply-button add-icon">
                                <button onClick={handleAccept}>
                                    <span className="box accept" style={{ width: '100px' }}>
                                        Accept
                                    </span>
                                </button>
                                <button onClick={handleReject}>
                                    <span className="box reject" style={{ width: '100px' }}>
                                        Reject
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </ListGroup.Item >
            </div >
        </>
    )
}
