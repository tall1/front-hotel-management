import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Rooms() {
    const {state} = useLocation();
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/rooms/")
            .then((res) => {
                return res.json()
            })
            .then((rooms) => {
                setRooms(rooms)
            });
    }, []);



    console.log({rooms});
    if (!rooms) return;
    return (
        <div>
            <header>Rooms</header>
            {<div>
                <table>
                    <thead>
                    <tr>
                        <th>roomNumber</th>
                        <th>availableDate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room) => {
                        return (
                            <tr key={room.roomNumber}>
                                <td>{room.roomNumber}</td>
                                <td> {room.floorNumber}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>}

        </div>
    );
}