import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import CommentsData from '../Comments/CommentsData';
import InfinityScrollTemplate from '../InfinityScroller/InfinityScrollTemplate';

export default function InfinityScroller({ api, limit, postId, Template, commentId }) {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await dispatch(api({ page, postId, commentId }));
                if (response && response.payload && response.payload.data.length === 0) {
                    setLoading(false);
                }
                if (response && response.payload && response.payload.data) {
                    setData(response.payload.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchApi();
    }, []);

    return (
        <>
            {
                data.map(comment =>
                    <Template key={comment._id} comment={comment} />
                )
            }
        </>
    )
}

