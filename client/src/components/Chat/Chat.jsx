import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './css/Chat.scss'
import Verified from '../Template/Verified'

function App() {

    return (
        <>
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-4 border-right">
                        <div className="settings-tray">
                            <img className="profile-image" src="https://media.licdn.com/dms/image/D5603AQG67HWdrjgyjQ/profile-displayphoto-shrink_400_400/0/1681319242285?e=1697673600&v=beta&t=UcZ8wxncanIiG6ZHW0qfozBFE5SZaAEQ2RrgPEkmNMM" alt="Profile img" />
                            <span className="settings-tray--right">
                                <i className="material-icons">cached</i>
                                <i className="material-icons">message</i>
                                <i className="material-icons">menu</i>
                            </span>
                        </div>
                        <div className="search-box">
                            <div className="input-wrapper">
                                <i className="material-icons">search</i>
                                <input placeholder="Search here" type="text" />
                            </div>
                        </div>
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src="https://media.licdn.com/dms/image/C4D03AQHdaDobDO3PYA/profile-displayphoto-shrink_800_800/0/1654675099942?e=1697673600&v=beta&t=WK8Ru61Dex2iMOvG4dqUxZRx7s2ThaVVgzyRe6Zexx8" alt="" />
                            <div className="text">
                                <h6>Pradeep Biswas <span>{<Verified/>}</span> </h6>
                                <p className="text-muted">Hey, you're arrested!</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr />
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg" alt="" />
                            <div className="text">
                                <h6>Optimus</h6>
                                <p className="text-muted">Wanna grab a beer?</p>
                            </div>
                            <span className="time text-muted small">00:32</span>
                        </div>
                        <hr />
                        <div className="friend-drawer friend-drawer--onhover ">
                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" alt="" />
                            <div className="text">
                                <h6>Skynet</h6>
                                <p className="text-muted">Seen that canned piece of s?</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr />
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg" alt="" />
                            <div className="text">
                                <h6>Termy</h6>
                                <p className="text-muted">Im studying spanish...</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr />
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg" alt="" />
                            <div className="text">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                        <hr />
                        <div className="friend-drawer friend-drawer--onhover">
                            <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg" alt="" />
                            <div className="text">
                                <h6>XXXXX</h6>
                                <p className="text-muted">Hi, wanna see something?</p>
                            </div>
                            <span className="time text-muted small">13:21</span>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="settings-tray">
                            <div className="friend-drawer no-gutters friend-drawer--grey">
                                <img className="profile-image" src="https://media.licdn.com/dms/image/C4D03AQHdaDobDO3PYA/profile-displayphoto-shrink_800_800/0/1654675099942?e=1697673600&v=beta&t=WK8Ru61Dex2iMOvG4dqUxZRx7s2ThaVVgzyRe6Zexx8" alt="" />
                                <div className="text">
                                    <h6>Pradeep Biswas <span>{<Verified/>}</span> </h6>
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
                            <div className="row no-gutters">
                                <div className="col-md-3">
                                    <div className="chat-bubble chat-bubble--left">
                                        Hello dude!
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-3 offset-md-9">
                                    <div className="chat-bubble chat-bubble--right">
                                        Hello dude!
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-3 offset-md-9">
                                    <div className="chat-bubble chat-bubble--right">
                                        Hello dude!
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-3">
                                    <div className="chat-bubble chat-bubble--left">
                                        Hello dude!
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-3">
                                    <div className="chat-bubble chat-bubble--left">
                                        Hello dude!
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-3">
                                    <div className="chat-bubble chat-bubble--left">
                                        Hello dude!
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-3 offset-md-9">
                                    <div className="chat-bubble chat-bubble--right">
                                        Hello dude!
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="chat-box-tray">
                                        <i className="material-icons">sentiment_very_satisfied</i>
                                        <input type="text" placeholder="Type your message here..." />
                                        <i className="material-icons">mic</i>
                                        <i className="material-icons">send</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
