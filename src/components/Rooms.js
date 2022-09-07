import React, {useEffect, useState} from 'react';

export default function Rooms() {
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        fetch("/rooms/get_rooms_by_user_id" + sessionStorage.getItem("userId"))
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