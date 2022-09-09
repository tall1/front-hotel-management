import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Home = () => {
  const [hotelData, setHotelData] = useState(null);
  const [userData, setUserData] = useState(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate('/signin');
    }
    fetch('/users/' + sessionStorage.getItem('userId'))
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        setUserData(user);

        fetch('/hotels/' + user.hotelId)
          .then((res) => {
            return res.json();
          })
          .then((hotel) => {
            setHotelData(hotel);
          });
      });
  }, []);

  if (!hotelData || !userData) return;

  return (
    <div>
      <h1>Hello {userData.firstName + " " + userData.lastName} !</h1>
      <br></br>
      Welcome to the evolutionary hotel management system
      <br></br>
      your hotel: {hotelData.hotelName}
      <br></br>
      number of floors :{hotelData.numOfFloors}
      <br></br>
      number of rooms :{hotelData.numOfRooms}
    </div>
  );
};

export default Home;
