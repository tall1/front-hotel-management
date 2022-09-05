import * as React from 'react';

export default function Info(props) {

    const [hotelData, setHotelData] = React.useState(null);
    const [userData, setUserData] = React.useState(null);

//     useEffect(()  => {
//         //const fetchData = async () => {
//         //save on session
//             const res=  fetch('/users/get_id_by_email?email=' +props.userid);
//             const userId =  res.json();
//             const userres=  fetch('/users/' +userId);
//             const user =  userres.json();
//             setUserData(user);
//             const hotelId = user.hotelId;
//             const hotelres= fetch('/hotels/' +hotelId);
//             const hotel =  hotelres.json();
//             setHotelData(hotel);
//         }
//    //     fetchData()
//           // make sure to catch any error
//       //    .catch(console.error);
//       ,[])


    return (
        <div className="Info">

            <h1> hello user</h1>
            {/* hello {userData.id} ! welcome to the evolutionary system */}
            {/* your hotel: {hotelData.hotelName}
        numberoffloors :{hotelData.numOfFloors}
        numberofrooms :{hotelData.numOfRooms} */}

        </div>
    );
}











