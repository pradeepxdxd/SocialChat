import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import './css/Users.css'
import PostLoading from '../Loaders/PostLoading'
import { faCircleCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function Users({ user, loading }) {
    const [request, setRequest] = useState(false);

    const handleRequest = () => setRequest(flag => flag ? false : true);

    if (loading) {
        <PostLoading />
    }

    return (
        <>
            <div key={user.id} className="comment-data">
                <ListGroup.Item className="comment-item">
                    <div className="comment-content">
                        <div className="user-details">
                            <img
                                width={50}
                                height={50}
                                className="rounded-circle user-image mr-3 mb-3"
                                src={user.profileImg}
                                alt="User Profile"
                            />
                            <div className="user-info">
                                <h5>{user.name}</h5>
                            </div>
                            <div className="reply-button add-icon">
                                {
                                    request ?
                                        <FontAwesomeIcon onClick={handleRequest} icon={faCircleCheck} size='xl' className='done' /> : <FontAwesomeIcon onClick={handleRequest} icon={faUserPlus} size='lg' />
                                }

                            </div>
                        </div>
                    </div>
                </ListGroup.Item>
            </div>
        </>
    )
}
