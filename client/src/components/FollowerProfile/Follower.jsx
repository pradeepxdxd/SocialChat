import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../../redux/thunk/post'
import { isFriend } from '../../redux/thunk/count'
import InfinityScrollerTest from '../../components/InfinityScroller/InfinityScrollerTest'
import Post from '../MyPost/Post'
import Profile from './Profile'
import './css/Follower.css'
import { userInfo } from '../../services/utils/common'
import MyPost from '../MyPost/MyPost'
import FollowButton from '../Buttons/FollowButton'
import PendingButton from '../Buttons/PendingButton'
import AcceptButton from '../Buttons/AcceptButton'
import { getFriendRequests, getFriends, getPendingRequests } from '../../services/apis/services'
import { doFollow, acceptRequest } from '../../redux/thunk/friend'

export default function Follower() {
    const { userId } = useParams();
    const [friendStatus, setFriendStatus] = useState();

    const { friend: isCompanion } = useSelector(state => state.count);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId === userInfo().userId) {
            return <MyPost />
        }
        else {
            dispatch(isFriend(userId));
            extraFunction()
                .then(stat => {
                    if (stat) {
                        setFriendStatus(stat);
                    }
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userId]);

    const extraFunction = async () => {
        let status;
        const pendingReqs = await getPendingRequests();
        // eslint-disable-next-line array-callback-return
        pendingReqs?.map(req => {
            if (userId === req.friendId) {
                status = req.statusOfRequest
            }
        })
        if (status) {
            // setRequestStatus({ ...requestStatus, PENDING: true });
        }
        else {
            const friendReqs = await getFriendRequests();
            // eslint-disable-next-line array-callback-return
            friendReqs?.map(req => {
                if (userId === req.friendId) {
                    status = req.statusOfRequest
                }
            })
            if (status) {
                // setRequestStatus({ ...requestStatus, REQUEST: true });
            }
            else {
                const allFriends = await getFriends();
                // eslint-disable-next-line array-callback-return
                allFriends?.map(req => {
                    if (userId === req.friendId) {
                        status = req.statusOfRequest
                    }
                })
                if (status) {
                    // setRequestStatus({ ...requestStatus, ACCEPTED: true });
                }
            }
        }
        return status;
    }

    const handlePending = () => {
        dispatch(doFollow(userId));
        setFriendStatus(false);
    }

    const handleFollow = () => {
        dispatch(doFollow(userId));
        setFriendStatus('PENDING');
    }

    const handleAccept = () => {
        dispatch(acceptRequest(userId));
        setFriendStatus('ACCEPTED');
    }

    return (
        <>
            <div className='top'>
                <Profile userId={userId} />
                {
                    friendStatus === 'PENDING' && <div onClick={handlePending} className='follow-button'><PendingButton /></div>
                }
                {
                    friendStatus === 'REQUEST' && <div onClick={handleAccept} className='follow-button'><AcceptButton /></div>
                }
                {
                    !isCompanion && !friendStatus && <div onClick={handleFollow} className='follow-button'><FollowButton /></div>
                }
            </div>
            {
                (isCompanion || friendStatus === 'ACCEPTED') && <InfinityScrollerTest api={getUserPosts} userId={userId} Template={Post} />
            }

        </>
    )
}

