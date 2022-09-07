import './App.css';
// import Login from './components/Login';
import LoadFile from './components/LoadFile';
import Reservations from './components/Reservations1';
import Rooms from './components/Rooms1';
import Home from './components/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Assignment from './components/Assignment';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Settings from './components/Settings';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HotelSignUp from './components/HotelSignUp';
import Info from './components/Info';
import React, {useEffect, useState} from 'react';
import Header from './components/Layout/Header';
import Room from './components/Room';
import Reservation from "./components/Reservation";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(() => (!!sessionStorage.getItem('userId')));
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Home/> : <SignIn/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/uploadfile" element={<LoadFile/>}/>
                        <Route path="/assign" element={<Assignment/>}/>
                        <Route path="/rooms" element={<Rooms/>}>
                            <Route path="/rooms/:roomId" element={<Room/>}/>
                        </Route>
                        <Route path="/reservations" element={<Reservations/>}>
                            <Route path="/reservations/:reservationNumber" element={<Reservation/>}/>
                        </Route>
                        <Route path="/info" element={<Info/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/hotel-signup" element={<HotelSignUp/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}
