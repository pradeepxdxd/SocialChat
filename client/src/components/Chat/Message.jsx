import React from 'react'

export default function Message({ chat }) {
    return (
        <>
            {
                chat.flag === 'SENDER' ?
                    <div className="row no-gutters">
                        <div className="col-md-3 offset-md-9">
                            <div className="chat-bubble chat-bubble--right">
                                {chat.msg}
                            </div>
                        </div>
                    </div> :
                    <div className="row no-gutters">
                        <div className="col-md-3">
                            <div className="chat-bubble chat-bubble--left">
                                {chat.msg}
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
