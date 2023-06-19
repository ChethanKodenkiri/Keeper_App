import React, { useState } from "react";
import Signup from '../Images/SignUp.png';
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import WorkIcon from '@mui/icons-material/Work';
import CallIcon from '@mui/icons-material/Call';
import alert from 'sweetalert';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser(prevValue => {
            return { ...prevValue, [name]: value }
        });
    }

    const PostData = async (event) => {
        event.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();

        if(res.status === 401 || !data){
            alert('Data!🚩','Please fill the data!','warning');
         //   window.alert("Please fill the data")
        }else if (res.status === 422) {
            // window.alert("User Already exist, Please login using credential ");
            alert('You are one of us 😎','User Already exist, Please login using credential!','warning');
            navigate('/signin');
        } else if(res.status === 421){
            // window.alert("Password is not matching")
            alert('Opps! 🧐',"Password isn't matching!",'warning');
        }else if(res.status ===403){
            // window.alert("Please enter valid mobile number")
            alert('Opps! 📱',"Please enter valid mobile number!",'warning');
        }
        else {
            // console.log("Registration succesfull");
            alert('Successful! 👌',"Registration succesfull!",'success');
            navigate("/signin");

        }

    }


    return (<>
        <div className="main">
            <section className="signup">
                <div className="container register">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name"><PersonIcon /></label>
                                    <input type="text" name="name" id="name" placeholder="  Your Name" autoComplete="off"
                                        value={user.name} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><EmailIcon /></label>
                                    <input type="email" name="email" id="email" placeholder="  Your Email" autoComplete="off"
                                        value={user.email} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone"><CallIcon /></label>
                                    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="  Your Telephone Number" autoComplete="off"
                                        value={user.phone} onChange={handleInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="work"><WorkIcon /></label>
                                    <input type="text" name="work" id="work" placeholder="  Your Profession" autoComplete="off"
                                        value={user.work} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"><PasswordIcon /></label>
                                    <input type="password" name="password" id="password" placeholder="  Password" autoComplete="off"
                                        value={user.pass} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword"><PasswordIcon /></label>
                                    <input type="password" name="cpassword" id="cpassword" placeholder="  Repeat your password" autoComplete="off"
                                        value={user.re_pass} onChange={handleInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <NavLink to="#" className="term-service">Terms of service</NavLink></label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" autoComplete="off"
                                        onClick={PostData}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={Signup} alt="sing up" /></figure>
                            <NavLink to="/signin" className="signup-image-link">I am already member</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>);
}

export default Register;