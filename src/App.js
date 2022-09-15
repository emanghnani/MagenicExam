import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Register from './Register';
import Home from './Home';
import RegisterDiscounted from "./RegisterDiscounted";
import Login from "./Login";
import CardInterface from "./portal/CardInterface";
import Reload from "./portal/Reload";
import Travel from "./portal/Travel";

function App() {
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/register" element ={<Register />} />
                <Route path = "/registerDiscounted" element ={<RegisterDiscounted />} />
                <Route path = "/login" element ={<Login />} />
                <Route path = "/cardInterface" element ={<CardInterface />} >
                    <Route path = "travel" element ={<Travel />} />
                    <Route path = "reload" element ={<Reload />} />
                </Route>
                </Routes>
         </Router>
        );

}

export default App;