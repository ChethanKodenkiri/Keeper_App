import React,{ createContext, useReducer} from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Contact from './components/Contact';
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import {intialState,reducer} from "./reducer/UseReducer";

const App = () => {
const [state,dispatch] = useReducer(reducer,intialState);
    
    return (
        <>
            <UserContext.Provider value={{state,dispatch}}>
            <Navbar />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/signin' element={<Login />} />
                    <Route path='logout' element={<Logout />} /> 
                    <Route path='*' element={<ErrorPage />} />
                </Routes>

                </UserContext.Provider>
        </>
    );
}
export const UserContext = createContext();
export default App;