import { getMyPosts } from '../../redux/thunk/post'
import Post from './Post';

import InfinityScroller from "../InfinityScroller/InfinityScroller"
import { useEffect } from 'react';

export default function MyPost() {

    useEffect(() => {
        document.title = 'Post';
    }, [])

    return (
        <>
            <div className='mt-3'>
                <InfinityScroller api={getMyPosts} limit={6} Templete={Post} />
            </div>
        </>
    )
}