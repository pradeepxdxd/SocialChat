import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { unFollow } from '../../redux/thunk/friend'
import './css/Followers.css'
import { useNavigate } from 'react-router-dom'

export default function Followers({ user }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUnfollow = () => {
        dispatch(unFollow(user.friend));
    }

    const handleShowProfile = () => {
        navigate(`/follower/${user.friendId}`);
    }

    return (
        <>
            <div key={user._id} className="comment-data mt-4">
                <ListGroup.Item className="comment-item">
                    <div className="comment-content">
                        <div className="user-details">
                            <img
                                onClick={handleShowProfile}
                                width={50}
                                height={50}
                                className="rounded-circle user-image mr-3 mb-3"
                                src={user.friend.profileImg}
                                alt="User Profile"
                            />
                            <div className="user-info">
                                <h5>{user.friend.name}</h5>
                            </div>
                            <div className="reply-button add-icon">
                                <button onClick={handleUnfollow}>
                                    <span className="box accept">
                                        Unfollow
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </ListGroup.Item>
            </div>
        </>
    )
}
