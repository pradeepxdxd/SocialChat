import React, { useEffect, useState } from 'react'
import { useGetUserQuery } from '../../redux/apis/user'
import Loading from '../Loaders/Loading'
import { useNavigate } from 'react-router-dom'
import EditForm from './EditForm';
import UserDetails from './UserDetails';
import Verified from '../Template/Verified';


export default function Profile() {
    const [userDetailsShow, setUserDetailsShow] = useState(true);
    const { data, isFetching } = useGetUserQuery(undefined, { refetchOnMountOrArgChange: true });

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Profile';
    }, []);

    if (isFetching) return <><Loading /></>

    const handleChangePassword = () => {
        navigate('/changePassword');
    }

    const handleEditProfile = () => {
        userDetailsShow ? setUserDetailsShow(false) : setUserDetailsShow(true);
    }

    return (
        <>
            <div className='mt-5'>
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src={data.user.profileImg} alt="avatar"
                                            className="rounded-circle img-fluid" style={{ width: "150px", height: '150px' }} />
                                        <h5 className="my-3">{data.user.name}<span>{data.user.verified === true && <Verified />}</span></h5>
                                        <p className="text-muted mb-1">Full Stack Developer</p>
                                        <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button onClick={handleEditProfile} type="button" className="btn btn-primary">Edit Profile</button>
                                            <button onClick={handleChangePassword} type="button" className="btn btn-outline-primary ms-1">Change Password</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush rounded-3">
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fas fa-globe fa-lg text-warning"></i>
                                                <p className="mb-0">https://mdbootstrap.com</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-github fa-lg" style={{ color: "#333333" }}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-twitter fa-lg" style={{ color: "#55acee" }}></i>
                                                <p className="mb-0">@mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-instagram fa-lg" style={{ color: "#ac2bac" }}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-facebook-f fa-lg" style={{ color: "#3b5998" }}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                {userDetailsShow ? <UserDetails data={data} /> : <EditForm data={data} setUserDetailsShow={setUserDetailsShow} />}

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                                </p>
                                                <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>
                                                <div className="progress rounded" style={{ height: '5px' }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="80"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                                                <div className="progress rounded" style={{ height: '5px' }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow="72"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="89"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                                                <div className="progress rounded" style={{ height: '5px' }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                                                <div className="progress rounded mb-2" style={{ height: '5px' }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                                </p>
                                                <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                                                <div className="progress rounded" style={{ height: '5px' }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="80"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow="72"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="89"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "55%" }} aria-valuenow="55"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>
                                                <div className="progress rounded mb-2" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "66%" }} aria-valuenow="66"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}