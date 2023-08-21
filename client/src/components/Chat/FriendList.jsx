import React from 'react'
import Verified from '../Template/Verified'

export default function FriendList({ friend, setShowChatBox, setFriendInfoInChatBox }) {
    const handleProfile = () => {
        setShowChatBox(true);
        setFriendInfoInChatBox(friend);
    }
    return (
        <>
            <div onClick={handleProfile} className="friend-drawer friend-drawer--onhover">
                <img className="profile-image" src={friend.profileImg} alt="profile_image" />
                <div className="text">
                    <h6>{friend.name} {friend.verified && <span>{<Verified />}</span>} </h6>
                    <p className="text-muted">Hey, you're arrested!</p>
                </div>
                <span className="time text-muted small">13:21</span>
            </div>
            <hr />
        </>
    )
}
