import './App.css';
// import Login from './components/Login';
import LoadFile from './components/LoadFile';
import Reservations from './components/Reservations';
import Rooms from './components/Rooms';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Settings from './components/Settings';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HotelSignUp from './components/HotelSignUp';
import Home from './components/Home';
import React from 'react';
import Header from './components/Layout/Header';
import Room from './components/Room';
import Reservation from './components/Reservation';
import Task from './components/Task';
import Assignment from './components/Assignment';
import AuthProvider from './store/AuthProvider';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/settings" element={<Settings />}>
              <Route
                path="/settings/assignment/:taskId"
                element={<Assignment />}
              />
            </Route>
            <Route path="/uploadfile" element={<LoadFile />} />
            <Route path="/tasks" element={<Tasks />}>
              <Route path="/tasks/:taskId" element={<Task />} />
              <Route
                path="/tasks/assignment/:taskId"
                element={<Assignment />}
              />
            </Route>
            <Route path="/rooms" element={<Rooms />}>
              <Route path="/rooms/:roomId" element={<Room />} />
            </Route>
            <Route path="/reservations" element={<Reservations />}>
              <Route
                path="/reservations/:reservationNumber"
                element={<Reservation />}
              />
            </Route>
            <Route path="/hotelsignup" element={<HotelSignUp />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
