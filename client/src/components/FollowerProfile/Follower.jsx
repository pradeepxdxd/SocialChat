import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../../redux/thunk/post'
import { isFriend } from '../../redux/thunk/count'
import InfinityScrollerTest from '../../components/InfinityScroller/InfinityScrollerTest'
import Post from '../MyPost/Post'
import Profile from './Profile'
import './css/Follower.css'
import { Button } from 'react-bootstrap'

export default function Follower() {
    const { userId } = useParams();

    const { friend : isCompanion } = useSelector(state => state.count);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isFriend(userId));
    }, [dispatch, userId])

    return (
        <>
            <div className='top'>
                <Profile userId={userId} />
            </div>
            {
                isCompanion && <InfinityScrollerTest api={getUserPosts} userId={userId} Template={Post} />
            }
            <Button variant='primary' className='text-center'>Follow</Button>
        </>
    )
}

