import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useLocation, useNavigate} from 'react-router-dom';


export default function HotelSignUp() {

    const [errorMessages, setErrorMessages] = useState("");
    const navigate = useNavigate();
    const {state} = useLocation();

    const error = "The number must be more then zero";


    const theme = createTheme();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        const res = await fetch('http://localhost:8080/users/get_id_by_email?email=' + state);
        console.log({res});
        const userId = await res.json();

        fetch('http://localhost:8080/hotels', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: "",
                adminId: userId,
                hotelName: data.get('hotelname'),
                numOfFloors: data.get('numberoffloors'),
                numOfRooms: data.get('numberofrooms'),
            })
        }).then(function (response) {
            if (response.status === 406) {
                document.getElementById('errorlabel').removeAttribute('hidden');
            } else {
                document.getElementById('errorlabel').setAttribute('hidden', 'hidden');
                navigate("/Login", {state: userId});
            }
            return response.json();
        });

        console.log({
            username: data.get('hotelname'),
            password: data.get('password'),
        });
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    return (
        <form onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Hotel Sign Up
                        </Typography>

                        <Box noValidate sx={{mt: 1}}>
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                id="hotelname"
                                label="hotel name"
                                name="hotelname"
                                autoComplete="hotelname"
                                autoFocus
                            />
                            {renderErrorMessage("uId")}
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                name="numberofrooms"
                                label="Number of rooms"
                                id="numberofrooms"
                                autoComplete="number of rooms"
                                inputProps={{pattern: "[0-9]"}}

                            />
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                name="numberoffloors"
                                label="Number of floors"
                                id="numberoffloors"
                                autoComplete="number of floors"
                                inputProps={{pattern: "[0-9]"}}
                            />
                            <label hidden id="errorlabel">{error}</label>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Hotel Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </form>

    );
}