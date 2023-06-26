import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Post({ post, caption, location, profileImg, name }) {
    const navigate = useNavigate()
    const handleProfileClick = () => {
        navigate('/profile');
    }
    return (
        <>
            <div className="col-md-4 mt-3">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <img onClick={handleProfileClick} src={profileImg} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px', cursor : 'pointer' }} />
                            <div>
                                <h5 className="card-title">{name}</h5>
                                <p className="card-subtitle text-muted">{location}</p>
                            </div>
                        </div>
                    </div>
                    <img src={post} style={{objectFit: 'cover', height:'500px'}} className="card-img-top" alt={caption} />
                    <div className="card-body">
                        <p className="card-text">{caption}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <button type="button" className="btn btn-link">Like</button>
                                <button type="button" className="btn btn-link">Comment</button>
                                <button type="button" className="btn btn-link">Share</button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-link">Save</button>
                            </div>
                        </div>
                        <p className="card-text">
                            Likes: {100}
                            <br />
                            Comments: {25}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
