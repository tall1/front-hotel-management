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

    useEffect(() => {
        let interval = setInterval(() => {

            var storedTask = JSON.parse(sessionStorage.getItem("task"));
            if (storedTask != null) {
                const res = fetch(`/assignments/get_status/` + storedTask);
                const jsonRes = res.json();
                if (JSON.stringify(jsonRes) == "DONE") {
                    alert("your assignment is ready - go to check it")
                    //showAssignment();
                }
            }


        }, 2000);

        return () => {
            clearInterval(interval);
        };

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

        console.log(state.userId);
        const res = await fetch("/assignments/byDate?userId=" + state.userId + "&day=5&month=8&year=2022");
        const data = await res.json();
        console.log({data});
        const key = Object.entries(data.reservationRoomHashMap);
        setAssign(key);
        console.log(key);
        setButtonClicked(true);
    }
    console.log({assign});
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
