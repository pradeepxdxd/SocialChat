// import React from 'react'
// import { useMyPostsQuery } from '../../redux/apis/post'
// import { useGetUserQuery } from '../../redux/apis/user'
// import Loading from '../Loading/Loading';
// import Post from './Post';
// import { Link } from 'react-router-dom';

// export default function MyPost() {
//     const { data: userPostData, isFetching } = useMyPostsQuery(undefined, { refetchOnMountOrArgChange: true });
//     const { data: userInfoData } = useGetUserQuery();

//     if (isFetching || !userInfoData) {
//         return <Loading />
//     }

//     if (userPostData.posts.length === 0) {
//         return <div>
//             <blockquote className="quote text-center mt-5" style={{fontFamily:'cursive'}}>
//                 <p>There is no any post yet! create your first post <Link to='/addPost' >Add Post</Link></p>
//             </blockquote>
//         </div>
//     }

//     return (
//         <>
//             <div className="container">
//                 <div className="row mt-5">
//                     {userPostData.posts?.map((post, index) => (
//                         <Post key={index} {...post} {...userInfoData.user} />
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }


import React, { useEffect, useState } from 'react'
import { useMyPostsQuery } from '../../redux/apis/post'
import { useGetUserQuery } from '../../redux/apis/user'
import Loading from '../Loading/Loading';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component'

export default function MyPost() {
    const [stopScroller, setStopScroller] = useState(true);
    let [page, setPage] = useState(1);
    const [allPost, setAllPost] = useState([])
    const { data: userPostData, isFetching } = useMyPostsQuery({ page }, {
        refetchOnMountOrArgChange: true,
    });
    const { data: userInfoData } = useGetUserQuery();

    useEffect(() => {
        if (userPostData && userPostData.posts) {
            setAllPost((prevData) => [...prevData, ...userPostData.posts]);
        }
    }, [userPostData]);

    useEffect(() => {
        if (userPostData && userPostData.posts.length === 0) {
            setStopScroller(false);
        }
    }, [userPostData]);

    if (isFetching || !userInfoData) {
        return <Loading />
    }
    const fetchMoreData = () => {
        setPage((page) = page + 1);
    }

    if (!userPostData || !userPostData.posts) {
        return (
            <div>
                No posts yet. Create your first post.
            </div>
        );
    }

    return (
        <>
            <div className="container" style={{ overflowX: 'hidden' }}>
                <InfiniteScroll
                    dataLength={userPostData.posts.length}
                    next={fetchMoreData}
                    hasMore={stopScroller}
                    loader={
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                >
                    <div className="row mt-5">
                        {allPost?.map((post, index) => (
                            <Post key={index} {...post} {...userInfoData?.user} />
                        ))}
                    </div>
                </InfiniteScroll>
                {
                    !stopScroller &&
                    <div>
                        No more posts...
                    </div>
                }
            </div>
        </>
    )
}

