import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function PostLoading() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '10vh' }}>
                <Spinner animation="border" variant="danger" />
            </div>
        </>
    )
}
