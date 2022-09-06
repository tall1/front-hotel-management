
import React from 'react';

import { useEffect, useState } from 'react';

export default function Info() {

     const [hotelData, setHotelData] = useState(null);
     const [userData, setUserData] = useState(null);

    useEffect(() => {
             fetch('/users/' + sessionStorage.getItem("userId"))
             .then((res) => {
                    return res.json()
            })
            .then((user) => {
                setUserData(user)

                fetch('/hotels/' + user.hotelId)
                .then((res) => {
                   return res.json()
               })
               .then((hotel) => {
                   setHotelData(hotel)
               });

            });

    }, []);

  
    if (!hotelData || !userData) return;


    return (
        <div>
            <h1>
            {/* hello {userData.email} ! */}
            </h1>
            <br></br>
             welcome to the evoluntary system 
            <br></br>
             your hotel: {hotelData.hotelName}
             <br></br>
        number of floors :{hotelData.numOfFloors}
        <br></br>
        number of rooms :{hotelData.numOfRooms}
        

        </div>
    );
}











