import React, { useEffect, useState } from 'react'
import InfinityScrollTemplate from './InfinityScrollTemplate';
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../../redux/thunk/user'
import Loading from '../Loaders/Loading'

export default function InfinityScroller({ api, limit, Templete }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [key] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mainLoading, setMainLoading] = useState(true);

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        setMainLoading(true);

        const fetchApi = async () => {
            dispatch(getUserInfo());
            try {
                const response = await dispatch(api(page));
                if (response && response.payload && response.payload.data.length === 0) {
                    setLoading(false);
                }
                if (response && response.payload && response.payload.data) {
                    setMainLoading(false);
                    setData(response.payload.data);
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
                const response = await dispatch(api(page + 1));
                console.log()
                if (response.payload.statusCode === 203) {
                    setLoading(false);
                }
                if (response && response.payload && response.payload.data.length === 0) {
                    setLoading(false);
                }
                if (response && response.payload && response.payload.data) {
                    setData(prevData => prevData.concat(response.payload.data));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchApi();
    };

    if (mainLoading) {
        return <Loading />
    }

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
