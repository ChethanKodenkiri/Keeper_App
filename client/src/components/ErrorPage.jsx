import React from "react";
import { NavLink } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <>
            <div id='notFound'>
                <div className="notFound">
                    <div className="notFound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, page not found !</h2>
                    <p className="md-5">
                        The page you have been looking for might have been removed or
                        had its name changed or it is temporarily unavailable
                    </p>
                    <NavLink to='/'>Goto HomePage</NavLink>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;