import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
);

// Old type of rendering

// ReactDOM.render(
   
//    <BrowserRouter><App /></BrowserRouter>

// ,document.getElementById('root'));


