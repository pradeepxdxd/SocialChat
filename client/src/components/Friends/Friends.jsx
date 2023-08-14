import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFriends, countOfRequests } from '../../redux/thunk/friend'
import Loading from '../Loaders/Loading'
import { Container, Row, Col } from 'react-bootstrap';
import FollowRequest from '../FollowRequests/FollowRequest';
import Followers from './Followers';

export default function Friends() {
    const dispatch = useDispatch();
    const { data, loading, counts } = useSelector(state => state.friend);

    useEffect(() => {
        dispatch(getAllFriends());
        dispatch(countOfRequests());
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div style={{ marginLeft: '370px' }}>
                <Container fluid className="d-flex justify-content-center align-items-center" style={{ marginTop: '100px' }}>
                    <div style={{ width: '900px' }}>
                        <Row>
                            <Col>
                                Followers
                            </Col>
                            <Col>
                                <FollowRequest counts={counts} />
                            </Col>
                        </Row>
                        {
                            data && data?.length > 0 &&
                            data?.map(user =>
                                <Followers key={user._id} user={user} />
                            )
                        }
                        {
                            // eslint-disable-next-line no-mixed-operators
                            (data === undefined || data === null || data?.length === 0) &&
                            <h6 className='mx-5 mt-5'>
                                You Don't have friends
                            </h6>
                        }
                    </div>
                </Container>
            </div>

        </>
    )
}