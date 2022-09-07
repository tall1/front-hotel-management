import './App.css';
// import Login from './components/Login';
import LoadFile from './components/LoadFile';
import Reservations from './components/Reservations';
import Rooms from './components/Rooms';
import Home from './components/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Tasks from './components/Tasks';
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
import Task from "./components/Task";
import Assignment from "./components/Assignment";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(() => false);
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Home/> : <SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/uploadfile" element={<LoadFile/>}/>
                        <Route path="/tasks" element={<Tasks/>}>
                            <Route path="/tasks/:taskId" element={<Task/>}/>
                            <Route path="/tasks/assignment/:taskId" element={<Assignment/>}/>
                        </Route>
                        <Route path="/rooms" element={<Rooms/>}>
                            <Route path="/rooms/:roomId" element={<Room/>}/>
                        </Route>
                        <Route path="/reservations" element={<Reservations/>}>
                            <Route path="/reservations/:reservationNumber" element={<Reservation/>}/>
                        </Route>
                        <Route path="/info" element={<Info/>}/>
                        <Route path="/hotel-signup" element={<HotelSignUp/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}
