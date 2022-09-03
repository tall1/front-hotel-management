import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Assignment from './components/Assignment';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Settings from './components/Settings'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HotelSignUp from './components/HotelSignUp'
import Info from './components/Info';
import React from 'react';

export default function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}>
                    </Route>
                    <Route path="/login" element={<Login/>}>
                    </Route>
                    <Route path="/assign" element={<Assignment/>}>
                    </Route>
                    <Route path="/settings" element={<Settings/>}>
                    </Route>
                    <Route path="/signup" element={<SignUp/>}>
                    </Route>
                    <Route path="/signin" element={<SignIn/>}>
                    </Route>
                    <Route path="/hotelsignup" element={<HotelSignUp/>}>
                    </Route>
                    <Route path="/info" element={<Info/>}>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}


