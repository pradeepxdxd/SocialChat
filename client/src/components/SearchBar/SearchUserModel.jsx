import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { searchByName } from '../../redux/thunk/user'
import Users from './Users';
import PostLoading from '../Loaders/PostLoading';

export default function SearchUserModel({ show, setShow }) {
    const [flagUserFound, setFlagUserFound] = useState(false);

    const handleHide = () => {
        setShow(false);
    }

    let { data, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSearch = e => {
        let userName = e.target.value;
        setFlagUserFound(false);
        if (userName.length > 0) {
            dispatch(searchByName(userName))
        }
        else if (userName === '') {
            setFlagUserFound(true);
        }
    }

    useEffect(() => {
        setFlagUserFound(true);
    }, [error])

    return (
        <>
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Search for friends
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <div>
                        <Form.Group controlId="searchInput">
                            <Form.Control
                                type="text"
                                placeholder="Search users..."
                                onChange={handleSearch}
                            />
                        </Form.Group>
                        <div className='mt-4'>
                            {
                                !flagUserFound ?
                                    data !== null && data.length > 0 &&
                                    data?.map(users =>
                                        <Users key={users._id} user={users} loading={loading} />
                                    )
                                    :
                                    <h4>User Not Found</h4>
                            }
                            {
                                loading && <PostLoading />
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
