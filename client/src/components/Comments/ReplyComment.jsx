import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function ReplyComment({reply}) {
    return (
        <>
            <ListGroup.Item key={reply.id} className="ml-4">
                <div>
                    <img
                        width={50}
                        height={50}
                        className="mr-3"
                        src={reply.profileImg}
                        alt={reply.name}
                    />
                    <div>
                        <h5>{reply.name}</h5>
                        <p>{reply.content}</p>
                    </div>
                </div>
            </ListGroup.Item>
        </>
    )
}
