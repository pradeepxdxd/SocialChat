import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../redux/thunk/user';
import { getCountOfLikesAndFollowers } from '../../redux/thunk/count'
import './css/Profile.css'
import {userInfo} from '../../services/utils/common'

export default function Profile({ userId, name, img }) {
    const { data } = useSelector(state => state.user);
    const { likes, followers, posts } = useSelector(state => state.count);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId){
            const id = userInfo().userId;
            dispatch(getCountOfLikesAndFollowers(id));
        }
        else{
            dispatch(getUserById(userId));
            dispatch(getCountOfLikesAndFollowers(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <header>
                <Container>
                    <Row className="profile">
                        <Col sm={'2'} className="profile-image">
                            <img src={data.profileImg || img} alt="profile" />
                        </Col>
                        <Col className="profile-stats">
                            <Col sm={'1'}>
                                <div style={{ marginLeft: '13px', fontFamily: '-moz-initial', fontWeight: 'bold' }}>{posts}</div> Posts
                            </Col>
                            <Col sm={'1'} style={{ marginRight: '23px' }}>
                                <div style={{ marginLeft: '28px', fontFamily: '-moz-initial', fontWeight: 'bold' }}>{followers}</div> Followers
                            </Col>
                            <Col sm={'1'}>
                                <div style={{ marginLeft: '12px', fontFamily: '-moz-initial', fontWeight: 'bold' }}>{likes}</div> Likes
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="profile-user-settings">
                            <h1 className="profile-user-name">{data.name || name}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="profile-bio">
                            <p>
                                <span className="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit
                                <span role="img" aria-label="camera">
                                    📷✈️🏕️
                                </span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
};

