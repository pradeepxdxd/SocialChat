import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './css/Chat.scss'
import Verified from '../Template/Verified'
import { getAllFriends } from '../../redux/thunk/chat'
import { getUserInfo } from '../../redux/thunk/user'
import FriendList from './FriendList';
import ChatBox from './ChatBox';

function App() {
    const [showChatBox, setShowChatBox] = useState(false);
    const [friendInfoInChatBox, setFriendInfoInChatBox] = useState();

    const { friends } = useSelector(state => state.chat);
    const { data } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFriends());
        dispatch(getUserInfo());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-4 border-right">
                        <div className="settings-tray">
                            {
                                data !== undefined && <img className="profile-image" src={data?.user?.profileImg} alt="Profile img" />
                            }
                            <span className="settings-tray--right">
                                <i className="material-icons">menu</i>
                            </span>
                        </div>
                        <div className="search-box">
                            <div className="input-wrapper">
                                <i className="material-icons">search</i>
                                <input placeholder="Search here" type="text" />
                            </div>
                        </div>
                        {/* friend list */}
                        {
                            friends !== null && friends.length > 0 && friends?.map(friend =>
                                <FriendList key={friend._id} friend={friend?.friendDetails} setShowChatBox={setShowChatBox} setFriendInfoInChatBox={setFriendInfoInChatBox} />
                            )
                        }
                    </div>
                    {/* chat box */}
                    {
                        showChatBox && <ChatBox friendInfo={friendInfoInChatBox} />
                    }
                </div>
            </div>
        </>
    );
}

export default App;
