import React from 'react'
import { useMyPostsQuery } from '../../redux/apis/post'
import {useGetUserQuery} from '../../redux/apis/user'
import Loading from '../Loading/Loading';
import Post from './Post';

export default function MyPost() {
    const { data : userPostData, isFetching } = useMyPostsQuery(undefined, {refetchOnMountOrArgChange : true});
    const { data: userInfoData } = useGetUserQuery();

    if (isFetching || !userInfoData) {
        return <Loading />
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    {userPostData.posts?.map((post, index) => (
                        <Post key={index} {...post} {...userInfoData.user}/>
                        ))}
                </div>
            </div>
        </>
    )
}
