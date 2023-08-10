import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from '../../redux/thunk/user'
import InfinityScrollTemplate from "./InfinityScrollTemplate";
import Loading from "../Loaders/Loading";
import NoPostYet from '../Template/NoPostYet'

export default function InfinityScrollerTest({ api, userId, Template }) {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [mainLoading, setMainLoading] = useState(true);
    const [data, setData] = useState([]);
    const [key] = useState(0);
    const [dataNotFound, setDataNotFound] = useState(false);

    const dispatch = useDispatch();
    const { data: userInfo } = useSelector(state => state.user);

    useEffect(() => {
        setMainLoading(true);
        const fetchApi = async () => {
            try {
                dispatch(getUserById(userId));
                const response = await dispatch(api({ page, userId }));
                if (response && response.payload && (response.payload.statusCode === 202 || response.payload.statusCode === 203)) {
                    setDataNotFound(true);
                    return;
                }
                if (response && response.payload && response.payload.data.length === 0) {
                    setLoading(false);
                }
                if (response && response.payload && response.payload.data) {
                    // setMainLoading(false);
                    setData(response.payload.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        setLoading(true);
        setPage(page + 1);
        const fetchApi = async () => {
            dispatch(getUserById(userId));
            try {
                const response = await dispatch(api({ page: page + 1, userId }));
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

    // if (mainLoading) {
    //     return <Loading />
    // }

    if (dataNotFound) {
        return <NoPostYet />
    }

    return (
        <>
            <div className="container" style={{ overflowX: "hidden" }}>
                <div className="row mt-3">
                    {data?.map((post, index) => (
                        <Template key={index + key} data={post} user={userInfo} />
                    ))}
                </div>
            </div>
            <div>
                {data.length > 0 && <InfinityScrollTemplate length={data.length} fetchData={fetchData} loading={loading} />}
            </div>
        </>
    )
}