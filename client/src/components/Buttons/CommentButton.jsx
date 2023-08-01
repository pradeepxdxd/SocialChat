import React from 'react'
import { Button } from 'react-bootstrap'

export default function CommentButton({commentCount}) {
    return (
        <>
            <Button variant="link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="pink" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }}>
                    <path d="M19.723 0H4.277A4.28 4.28 0 0 0 0 4.277v11.446a4.28 4.28 0 0 0 4.277 4.277h2.128l2.128 2.128 2.128-2.128h8.064A4.28 4.28 0 0 0 24 15.723V4.277A4.28 4.28 0 0 0 19.723 0zm1.06 15.723a1.06 1.06 0 0 1-1.06 1.06H6.383l-1.064 1.064V4.277a1.06 1.06 0 0 1 1.064-1.06h15.446a1.06 1.06 0 0 1 1.06 1.06v11.446z" />
                </svg>
                Comment <span style={{color:'pink'}}>{commentCount}</span>
            </Button>
        </>
    )
}
