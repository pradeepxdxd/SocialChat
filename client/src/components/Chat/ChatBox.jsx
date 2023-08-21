import React, { useEffect, useState } from 'react'
import Verified from '../Template/Verified'
import { useDispatch, useSelector } from 'react-redux';
import { getChats, sendMessage } from '../../redux/thunk/chat'
import Message from './Message';
import { toastFailer } from '../../services/utils/alerts'
import './css/ChatBox.css'

export default function ChatBox({ friendInfo }) {
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();
    const { chats } = useSelector(state => state.chat);

    useEffect(() => {
        dispatch(getChats(friendInfo?._id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friendInfo]);

    const handleSendMessage = async () => {
        if (msg.trim() !== '') {  // Check if the message is not empty or only whitespace
            dispatch(sendMessage({ msg, receiverId: friendInfo?._id }));
            setMsg('');
        }
        else {
            toastFailer('Type your message');
        }
    }

    return (
        <>
            <div className="col-md-8 chat-wrapper">
                <div className="settings-tray">
                    <div className="friend-drawer no-gutters friend-drawer--grey">
                        <img className="profile-image" src={friendInfo?.profileImg} alt="profile_imgage" />
                        <div className="text">
                            <h6>{friendInfo?.name} {friendInfo?.verified && <span>{<Verified />}</span>}</h6>
                            <p className="text-muted">Layin' down the law since like before Christ...</p>
                        </div>
                        <span className="settings-tray--right">
                            <i className="material-icons">cached</i>
                            <i className="material-icons">message</i>
                            <i className="material-icons">menu</i>
                        </span>
                    </div>
                </div>
                <div className="chat-panel">
                    {
                        chats !== undefined && chats.length > 0 &&
                        chats?.map(chat =>
                            <Message key={chat._id} chat={chat} />
                        )
                    }
                    <div className="row">
                        <div className="col-12">
                            <div className="chat-box-tray">
                                <i className="material-icons">sentiment_very_satisfied</i>
                                <input placeholder="Type your message here..." onChange={e => setMsg(e.target.value)} />
                                <i className="material-icons">mic</i>
                                <i className="material-icons send-btn-cursor" onClick={handleSendMessage}>send</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
