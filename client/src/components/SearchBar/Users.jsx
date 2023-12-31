import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import './css/Users.css'
import PostLoading from '../Loaders/PostLoading'
import { userInfo } from '../../services/utils/common'
import { doFollow, acceptRequest, unFollow } from '../../redux/thunk/friend'
import { getPendingRequests, getFriendRequests, getFriends } from '../../services/apis/services'
import { useNavigate } from 'react-router-dom'
import Verified from '../Template/Verified'

export default function Users({ user, loading, handleHide }) {
    const [request, setRequest] = useState(false);
    const [requestStatus, setRequestStatus] = useState({ IS_LOGGED_USER: false, ACCEPTED: false, PENDING: false, REQUEST: false });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = userInfo().userId;
        if (userId === user._id) {
            setRequestStatus({ ...requestStatus, IS_LOGGED_USER: true });
            setRequest(true)
        }
        else if (user) {
            extraFunction();
        }
        else {
            setRequest(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const extraFunction = async () => {
        let status;
        const pendingReqs = await getPendingRequests();
        // eslint-disable-next-line array-callback-return
        pendingReqs?.map(req => {
            if (user._id === req.friendId) {
                status = req.statusOfRequest
            }
        })
        if (status) {
            setRequestStatus({ ...requestStatus, PENDING: true });
            setRequest(true)
        }
        else {
            const friendReqs = await getFriendRequests();
            // eslint-disable-next-line array-callback-return
            friendReqs?.map(req => {
                if (user._id === req.friendId) {
                    status = req.statusOfRequest
                }
            })
            if (status) {
                setRequestStatus({ ...requestStatus, REQUEST: true });
                setRequest(true)
            }
            else {
                const allFriends = await getFriends();
                // eslint-disable-next-line array-callback-return
                allFriends?.map(req => {
                    if (user._id === req.friendId) {
                        status = req.statusOfRequest
                    }
                })
                if (status) {
                    setRequestStatus({ ...requestStatus, ACCEPTED: true });
                    setRequest(true);
                }
                else {
                    setRequest(false);
                }
            }
        }
    }

    const handleAccept = () => {
        dispatch(acceptRequest(user._id));
        setRequestStatus({ ...requestStatus, ACCEPTED: true, REQUEST: false });
        setRequest(true);
    }

    const handleSendRequest = () => {
        // send friend request
        // setRequest(flag => flag ? false : true);
        dispatch(doFollow(user._id));
        setRequestStatus({ ...requestStatus, PENDING: true });
        setRequest(true);
    }

    const handlePending = () => {
        // withdrawl friend request
        setRequest(flag => flag ? false : true);
        dispatch(doFollow(user._id));
    }

    const handleUnfollow = () => {
        dispatch(unFollow(user._id));
        setRequestStatus({ ...requestStatus, ACCEPTED: false, PENDING: false, REQUEST: false });
        setRequest(false);
    }

    const handleClickOnProfile = () => {
        handleHide(false);
        navigate(`/follower/${user._id}`);
    }

    if (loading) {
        <PostLoading />
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
                                src={user.profileImg}
                                alt="User Profile"
                                onClick={handleClickOnProfile}
                            />
                            <div className="user-info">
                                <h5>{user.name}<span>{user.verified === true && <Verified />}</span></h5>
                            </div>
                            {
                                // eslint-disable-next-line no-mixed-operators
                                requestStatus.IS_LOGGED_USER && null
                            }
                            <div className="reply-button add-icon">
                                {
                                    request && requestStatus.REQUEST &&
                                    <>
                                        <button onClick={handleAccept}>
                                            <span className="box accept">
                                                Accept
                                            </span>
                                        </button>
                                    </>
                                }
                                {
                                    request && requestStatus.PENDING &&
                                    <>
                                        <button onClick={handlePending}>
                                            <span className="box pending">
                                                Pending
                                            </span>
                                        </button>
                                    </>
                                }
                                {
                                    request && requestStatus.ACCEPTED &&
                                    <>
                                        <button onClick={handleUnfollow}>
                                            <span className="box unfollow">
                                                Unfollow
                                            </span>
                                        </button>
                                    </>
                                }
                                {
                                    !request &&
                                    <>
                                        <button onClick={handleSendRequest}>
                                            <span className="box follow">
                                                follow
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </ListGroup.Item>
            </div>
        </>
    )
}
