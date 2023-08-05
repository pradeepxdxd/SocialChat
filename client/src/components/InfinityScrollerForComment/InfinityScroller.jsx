import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import CommentsData from '../Comments/CommentsData';
// import InfinityScrollTemplate from '../InfinityScroller/InfinityScrollTemplate';

export default function InfinityScroller({ api, postId, Template, commentId, incReplyComment }) {
    const [page] = useState(1);
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    let comment;
    if (!commentId) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        comment = useSelector(state => state.comment);
    }
    else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        comment = useSelector(state => state.reply);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                // const response =
                await dispatch(api({ page, postId, commentId }));
                // if (response && response.payload && response.payload.data.length === 0) {
                //     setLoading(false);
                // }
                // if (response && response.payload && response.payload.data) {
                //     setData(response.payload.data);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                    comment.data && comment.data.length > 0 && comment.data.map(comment =>
                        <Template key={comment._id} comment={comment} incReplyComment={incReplyComment} />
                    )
            }
        </>
    )
}

