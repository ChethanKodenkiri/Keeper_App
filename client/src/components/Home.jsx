import React, { useEffect, useState } from "react";

const Home = ()=>{
const [userName,setUserName] = useState();
const[show, setShow] = useState(false);
    const homePage =async()=>{
        const res = await fetch('/home');
        const data = await res.json();
        setUserName(data.name);
        setShow(true);
    }

    useEffect(()=>{
        homePage();
    },[]);

    return (<>
        <div className="home-page">
            <div className="home-div">
                <p className="pt-5">WELCOME</p>
                <h1>{userName}</h1>
                <br />
                <h5>{show?'Happy to see you! ❤️':'MERN'}</h5>
            </div>
        </div>
    </>
    
    )
}

export default Home;