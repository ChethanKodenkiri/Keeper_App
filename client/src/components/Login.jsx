import React , {useContext, useState} from "react";
import SignIn from '../Images/SignIn.jpg';
import { NavLink, useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import alert from 'sweetalert';
import { UserContext } from "../App";
const Login = () => { 

    const{state,dispatch} = useContext(UserContext)


const navigate = useNavigate();
const [userLogin, setUserLogin] = useState({
    email:'',password:''
});

const handleLogin =(event)=>{
    const {name,value}=event.target;
    setUserLogin(prevValue =>{
        return {...prevValue,[name]:value}
    });
}

const login = async(event)=>{
    event.preventDefault();
    const {email,password} = userLogin;

    const res = await fetch("/signin",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
    });
    const data = await res.json();
    if(res.status === 400 || !data){
        // window.alert('Invalid creadential, Please check the credential');
        alert('Opps! 😅','Invalid creadential, Please check the credential!','error')
    }else{
        dispatch({type:"USER",payload:true});
        //  window.alert(userName.name + 'Logged in successfully');
        alert('Welcome 😊','Logged in successfully!','success')
        navigate('/');
    }
}


    return (<>
        <div className="main">
            <section className="sign-in">
                <div className="container signin">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src={SignIn} alt="sing up" /></figure>
                            <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="your_name"><EmailIcon /></label>
                                    <input type="text" name="email" id="email" placeholder="  Your Name" autoComplete="off" 
                                        value = {userLogin.email} onChange={handleLogin}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><PasswordIcon /></label>
                                    <input type="password" name="password" id="password" placeholder="Password" autoComplete="off"
                                    value = {userLogin.password} onChange={handleLogin} />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"
                                    onClick={login} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>)
}

export default Login;