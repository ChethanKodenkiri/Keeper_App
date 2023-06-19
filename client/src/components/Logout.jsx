import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout =()=>{
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch({type:'USER',payload:false});
        navigate('/signin');
    },[]);
    return(<>
       
    </>);
}

export default Logout;