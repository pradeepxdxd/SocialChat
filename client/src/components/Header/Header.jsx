// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import { isLoggedIn } from '../../services/utils/common'
// import { logout } from '../../redux/slices/authSlices';
// import { useDispatch } from 'react-redux';
// import { useCallback } from 'react';
// import { NavDropdown } from 'react-bootstrap';
// import './Header.css'
// import SearchBar from '../SearchBar/SearchBar';

// function BasicExample() {
//     const auth = isLoggedIn();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const handleLogout = useCallback(() => {
//         dispatch(logout());
//         navigate('/');
//     })

//     return (
//         <Navbar bg="light" expand="lg" fixed="top">
//             {auth ? (
//                 <Navbar.Brand className='mx-2 animated-text' as={Link} to='/dashboard'>Picstagraph</Navbar.Brand>
//             ) : (
//                 <Navbar.Brand className='mx-2 animated-text' as={Link} to='/'>Picstagraph</Navbar.Brand>
//             )}
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="me-auto">
//                     {auth ?
//                         <>
//                             <Nav.Link as={Link} to='/addPost'>Add Post</Nav.Link>
//                             <Nav.Link as={Link} to='/myPost'>My Post</Nav.Link>
//                             <Nav.Link as={Link} to='/friends'>Friends<span style={{ color: 'green' }}>●</span></Nav.Link>
//                             <Nav.Link as={Link} to='/#'>Chat <span style={{ color: 'red', fontFamily: 'monospace' }}>3</span></Nav.Link>
//                         </>
//                         :
//                         <>
//                             <Nav.Link as={Link} to='/signup'>SignUp</Nav.Link>
//                             <Nav.Link as={Link} to='/'>Login</Nav.Link>
//                         </>
//                     }
//                 </Nav>
//                 {
//                     auth && <SearchBar />
//                 }
//                 <Nav className="ml-auto profile"> {/* Add this Nav component */}
//                     {auth ? (
//                         <>
//                             {/* ... */}
//                             <NavDropdown className='mx-2' title="Profile" id="basic-nav-dropdown">
//                                 <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
//                                 <NavDropdown.Item as={Link} to="/#">Settings</NavDropdown.Item>
//                                 <NavDropdown.Divider />
//                                 <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//                             </NavDropdown>
//                         </>
//                     ) : (
//                         <>
//                             {/* ... */}
//                         </>
//                     )}
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>

//     );
// }

// export default BasicExample;

import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../services/utils/common';
import { logout } from '../../redux/slices/authSlices';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { NavDropdown } from 'react-bootstrap';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
    const auth = isLoggedIn();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigate('/');
    });

    const toggleNavbar = () => {
        setExpanded(!expanded);
    };

    return (
        <Navbar bg="light" expand="lg" fixed="top" expanded={expanded}>
            {auth ? (
                <Navbar.Brand className='mx-2 animated-text' as={Link} to='/dashboard'>Picstagraph</Navbar.Brand>
            ) : (
                <Navbar.Brand className='mx-2 animated-text' as={Link} to='/'>Picstagraph</Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {auth ?
                        <>
                            <Nav.Link as={Link} to='/addPost'>Add Post</Nav.Link>
                            <Nav.Link as={Link} to='/myPost'>My Post</Nav.Link>
                            <Nav.Link as={Link} to='/friends'>Friends<span style={{ color: 'green' }}>●</span></Nav.Link>
                            <Nav.Link as={Link} to='/chat'>Chat <span style={{ color: 'red', fontFamily: 'monospace' }}>3</span></Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link as={Link} to='/signup'>SignUp</Nav.Link>
                            <Nav.Link as={Link} to='/'>Login</Nav.Link>
                        </>
                    }
                </Nav>
                {
                    auth && <SearchBar />
                }
                <Nav className="ml-auto profile">
                    {auth ? (
                        <>
                            <NavDropdown className='mx-2' title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/#">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <>
                            {/* ... */}
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
