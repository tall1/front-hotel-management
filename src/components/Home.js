
import React, {useEffect, useState} from 'react';
import styles from './Home.module.css';

const Home = () => {
  const [hotelData, setHotelData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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
    <div className={styles.home}>
      <h1>Hello {userData.firstName + ' ' + userData.lastName} !</h1>
      <p>
        Welcome to the evolutionary hotel management system your hotel:{' '}
        {hotelData.hotelName}
      </p>
      <p>number of floors: {hotelData.numOfFloors}</p>
      <p>number of rooms: {hotelData.numOfRooms}</p>
    </div>
  );
};

export default Home;
