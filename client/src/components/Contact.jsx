import React, { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import alert from 'sweetalert';

const Contact = () => {
    const [userData, setUserData] = useState({
        name: '', email: '', message: ''
    });

    const userContact = async () => {
        const res = await fetch('/getData');

        const data = await res.json();
        setUserData({ ...userData, name: data.name, email: data.email });
    }
    useEffect(() => {
        userContact()
    }, [])


    const handleInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUserData(prevData => {
            return { ...prevData, [name]: value }
        });
    }

    const sendToBackend = async (event) => {
        event.preventDefault();
        const { name, email, message } = userData;
        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();
        if (!data) {
            alert('Opps! 😅', 'Message not sent!', 'warning');
        } else if (res.status === 401) {
            alert('Opps! 😅', 'Problem encountered while sending!', 'warning');
        } else if (res.status === 201) {
            alert('Thank you! ❤️', 'Thank you for your message!', 'success');
            setUserData({ ...userData, message: '' })
        }

    }




    return (<>
        <div className="main">
            <section className="sign-in">
                <div className="container contactus">
                    <div className="conatct-content">

                        <div className="signin-form">
                            <h2 className="form-title">Get In Touch</h2>
                            <form method="POST" className="register-form" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="name"><PersonIcon /></label>
                                    <input type="text" name="name" id="name" placeholder="  Your Name" autoComplete="off" value={userData.name}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><EmailIcon /></label>
                                    <input type="email" name="email" id="email" placeholder="  Your Email" autoComplete="off" value={userData.email}
                                        onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <textarea type="text" name="message" id="text" placeholder="Type your message " autoComplete="off" value={userData.message}
                                        onChange={handleInput} />
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Send Message"
                                        onClick={sendToBackend}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>)
}

export default Contact;