import { getMyPosts } from '../../redux/thunk/post'
import Post from './Post';
import InfinityScroller from "../InfinityScroller/InfinityScroller"
import { useEffect } from 'react';
import Profile from '../FollowerProfile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/thunk/user'

export default function MyPost() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserInfo());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {data && data?.user &&
                <>
                    <div style={{marginTop : '100px'}}>
                        <Profile name={data.user.name} img={data.user.profileImg} verified={data.user.verified}  />
                    </div>
                    <div className=''>
                        <InfinityScroller api={getMyPosts} limit={6} Templete={Post} />
                    </div>
                </>
            }
        </>
    )
}