import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostLoading from '../Loaders/PostLoading'

export default function InfinityScrollTemplate({ length, fetchData, loading }) {
    return (
        <InfiniteScroll
            dataLength={length} //This is important field to render the next data
            next={fetchData}
            hasMore={loading}
            loader={<PostLoading/>}
        />
    )
}
