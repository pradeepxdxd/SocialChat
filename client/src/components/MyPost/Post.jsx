import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../Buttons/LIkeButton";
import { Row, Col } from "react-bootstrap";
import CommentButton from "../Buttons/CommentButton";
import { useDispatch } from "react-redux";
import { doLikeAndUnLike } from "../../redux/thunk/like";
import { userInfo } from '../../utils/common'
import ShareButton from "../Buttons/ShareButton";

export default function Post({ data, user }) {
    const [doLike, setDoLike] = useState(false);
    const [totalLike, setTotalLike] = useState(data.likeCount);
    // const [totalComment, setTotalComment] = useState(data.commentCount + data.repliesCount);
    const [totalComment] = useState(data.commentCount + data.repliesCount);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = userInfo();
        let flag = false;
        // eslint-disable-next-line array-callback-return
        data.likes?.map(likers => {
            if (likers.likerId === user.userId) {
                flag = true;
                // eslint-disable-next-line array-callback-return
            }
        });

        flag ? setDoLike(true) : setDoLike(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleLike = () => {
        setDoLike(doLike ? false : true);
        if (doLike) {
            setTotalLike((prev) => prev - 1);
        } else {
            setTotalLike((prev) => prev + 1);
        }

        dispatch(doLikeAndUnLike({ posterId: data.userId, postId: data._id }));
    };

    return (
        <>
            <div className="col-md-4 mt-3">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <img
                                onClick={handleProfileClick}
                                src={user.profileImg}
                                alt="Profile"
                                className="rounded-circle"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            />
                            <div>
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-subtitle text-muted">{data.location}</p>
                            </div>
                        </div>
                    </div>
                    <img
                        src={data.post}
                        style={{ objectFit: "cover", height: "500px" }}
                        className="card-img-top"
                        alt={data.caption}
                    />
                    <div className="card-body">
                        <p className="card-text">{data.caption}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Row>
                                    <Col>
                                        <LikeButton
                                            doLike={doLike}
                                            handleLike={handleLike}
                                            likeCounts={totalLike}
                                        />
                                    </Col>
                                    <Col>
                                        <CommentButton commentCount={totalComment} postId={data._id} posterId={data.userId} />
                                    </Col>
                                    <Col>
                                        <ShareButton shareCount={3}/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
