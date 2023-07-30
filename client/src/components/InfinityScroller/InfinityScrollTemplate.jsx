import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function InfinityScrollTemplate({ length, fetchData }) {
    return (
        <InfiniteScroll
            dataLength={length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
        />
    )
}
