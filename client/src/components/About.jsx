import React, { useEffect, useState} from "react";
import image from '../Images/SignIn.jpg';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
       ( async () => {
            try {
                const res = await fetch('/about', {    
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });         
                 const data =await res.json();
                //set User Data
               
               setUserData(data);
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }
               else if (res.status === 401) {
                    navigate('/signin');
                }
    
            } catch (error) {
                navigate('/signin');
            }
        })();
    }, []);

    return (<>
        <div className="main">
            <div className="container about-content">
                <form mathod="GET">
                    <div className='row'>
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={image} alt="just img" />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="profile-name">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5">
                                    Rankings: <span>1/10</span>
                                </p>


                                <ul className="navi" role="tablist">
                                    <li className="toggle">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab" href="#home">About</a>
                                    </li>
                                    {/* <li className="toggle">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" role="tab" href="#profile">Timeline</a>
                                    </li> */}
                                </ul>

                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="profile-edit-btn">Edit Profile</button>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8 pl-5">

                            <div id="tabContent">

                                <div id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row userInfo">
                                        <div className="col-md-6 userInfoTag">
                                            <p>User ID</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData._id}</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Email</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Phone Number</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Profession</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* .........................  second pannell pending for now  .......................... */}

                                {/* <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row userInfo">
                                        <div className="col-md-6 userInfoTag">
                                            <p>Experience</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>8763487265872</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Ryan Serhant</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Email</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>ryanserhant@gmail.com</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Phone Number</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>876348726</p>
                                        </div>

                                        <div className="col-md-6 userInfoTag">
                                            <p>Profession</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Web Developer</p>
                                        </div>
                                    </div>
                                </div> */}




                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>);
};

export default About;