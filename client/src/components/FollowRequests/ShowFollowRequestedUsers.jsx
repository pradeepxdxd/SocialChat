import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowRequest } from '../../redux/thunk/followRequest'
import Requests from './Requests';

export default function ShowFollowRequestedUsers({ show, setShow }) {
    const { data } = useSelector(state => state.request);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFollowRequest())
    }, [dispatch]);

    const handleHide = () => {
        setShow(false);
    }

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
                        Following Requests
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto', width: '1000px' }}>
                    <div>
                        <div className='mt-4'>
                            {
                                data && data?.length > 0 && data?.map(user =>
                                    <Requests user={user} key={user._id} />
                                )
                            }
                            {
                                (data === undefined || data === null || data?.length === 0) &&
                                <h6>
                                    No Follow Request Pending
                                </h6>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
