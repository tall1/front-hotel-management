import react, { Component, useState } from 'react';
import { Route , useNavigate, useLocation} from 'react-router';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Assignment(){
    const { state } = useLocation();
    const [assign, setAssign] = useState([]);
    const [buttonClicked , setButtonClicked] = useState(false);

    useEffect(() => {
      var storedAssign = JSON.parse(sessionStorage.getItem("assign"));
        if (storedAssign != null)
        {
            const key = Object.entries(storedAssign.reservationRoomMap);
             setAssign(key);
           // setAssign(storedAssign.reservationRoomMap);
        }
    } ,  []);


        return(
            <div className='Assignment'>
                <header>Assignment</header>
                {/* <button onClick={handleClick}>to the Assignment </button>    */}
                {/* {buttonClicked && */}
                 <div>
                    <table>
                    <thead>
                        <tr>
                        <th>room</th>
                        <th>reservation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assign.map((key) => {
                        return (
                            <tr key={key} >
                            <td>{key[0] }</td>
                            <td> {key[1]}</td>
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                    </div>
                    {/* } */}
                
            </div>
            );
}
