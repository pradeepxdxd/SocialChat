import React, { useEffect, useState } from 'react'
import InfinityScrollTemplate from './InfinityScrollTemplate';
import { useDispatch, useSelector } from 'react-redux'
import {getUserInfo} from '../../redux/thunk/user'

export default function InfinityScroller({ api, limit, Templete }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [key] = useState(0);
    const [loading, setLoading] = useState(true);

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            dispatch(getUserInfo());
            try {
                const response = await dispatch(api(page));
                if (response && response.payload && response.payload.posts.length === 0){
                    setLoading(false);
                }
                if (response && response.payload && response.payload.posts) {
                    setData(response.payload.posts);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchApi();
    }, []);

    const fetchData = () => {
        setLoading(true);
        setPage(page + 1);
        const fetchApi = async () => {
            dispatch(getUserInfo());
            try {
                const response = await dispatch(api(page+1));
                if (response && response.payload && response.payload.posts.length === 0){
                    setLoading(false);
                }
                if (response && response.payload && response.payload.posts) {
                    setData(prevData => prevData.concat(response.payload.posts));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchApi();
    };

    return (
        <>
            <div className="container" style={{ overflowX: "hidden" }}>
                <div className="row mt-5">
                    {data?.map((post, index) => (
                        <Templete key={key + index} data={post} user={user.data.user} />
                    ))}
                </div>
            </div>
            <div>
                {data.length > 0 && <InfinityScrollTemplate length={data.length} fetchData={fetchData} loading={loading} />}
            </div>
        </>
    );
}
