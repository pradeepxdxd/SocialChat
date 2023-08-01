import React from 'react'
import { Button } from 'react-bootstrap';

export default function LikeButton({ doLike, handleLike, likeCounts }) {
    return (
        <>
            <Button
                variant={doLike ? 'light' : 'light'} // Use 'danger' variant for the liked state, and 'light' for the unliked state
                onClick={handleLike}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={doLike ? 'pink' : '#dbdbdb'} xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 16.36 2 13.25 2 9.75 2 7.57 3.29 5.64 5.21 4.6 7.13 3.55 9.47 3 12 3s4.87.55 6.79 1.6C20.71 5.64 22 7.57 22 9.75c0 3.5-3.4 6.61-8.55 10.28L12 21.35z" />
                </svg>
                {doLike ? 'Liked' : 'Like'}
                <span style={{ marginLeft: '5px', fontWeight: 'bold', color:"pink" }}>{likeCounts}</span>
            </Button>
        </>
    )
}
