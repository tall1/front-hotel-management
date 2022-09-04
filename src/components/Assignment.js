import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Assignment() {
    const {state} = useLocation();
    const [assign, setAssign] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);

    // TODO: do I need this function?
    useEffect(() => {
        let intervalId = setInterval(async () => {
            var curTaskID = JSON.parse(sessionStorage.getItem("curTaskID"));
            if (curTaskID != null) {
                const res = await fetch(`/assignments/get_status/` + curTaskID)
                    .then((body) => {
                        return (body.text());
                    });
                if (res === "DONE") {
                    //alert("your assignment is ready - go to check it");
                    clearInterval(intervalId);
                    //showAssignment();
                }
            }
        }, 2000);
    }, []);


    const popUp = () => {
        return (
            <Alert
                onClose={() => {
                }}
                action={
                    <Link to="/assign">
                        <Button color="inherit" size="small">
                            go to check it
                        </Button>
                    </Link>
                }

            >
                The assignment is ready!
            </Alert>
        )
    }

    const handleClick = async (event) => {
        event.preventDefault();
        console.log("curTaskID: " + sessionStorage.getItem("curTaskID"));
        const res = await fetch("/assignments/get_assignment/" + sessionStorage.getItem("curTaskID"))
            .then((response) => response.json())
            .then((data) => data.reservationRoomMap);
        console.log(res);
        //const res = await fetch("/assignments/byDate?userId=" + state.userId + "&day=5&month=8&year=2022");
        const key = Object.entries(res);
        setAssign(key);
        setButtonClicked(true);
    }
    return (
        <div className='Assignment'>
            <header>Assignment</header>
            <button onClick={handleClick}>to the Assignment</button>
            {buttonClicked && <div>
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
                            <tr key={key}>
                                <td>{key[0]}</td>
                                <td> {key[1]}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>}

        </div>
    );
}
