import {useState} from 'react';
import {Button, FormControlLabel, FormGroup} from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {ThemeProvider, useTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import React from 'react';

export default function Settings(props) {

    const [selectionStrategy, setselectionStrategy] = useState("");
    const [errorMessages, setErrorMessages] = useState("");
    const theme = useTheme();
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [date, setDate] = useState(new Date());


    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const handleChange = (event) => {

        switch (event.target.id) {
            case ('1') :
                setChecked1(event.target.checked);
                break;
            case('2'):
                setChecked2(event.target.checked);
                break;
            case('3'):
                setChecked3(event.target.checked);
                break;
            case('4'):
                setChecked4(event.target.checked);
            // eslint-disable-next-line no-fallthrough
            default:
                break;
        }
    };

    const errors = {
        tournament: "The value must be between 0.5 - 1",
        truncation: "The value must be between 0 - 1",

    };

    const onChangeSelection = (event) => {
        var elem = document.getElementById('selection');
        setselectionStrategy(event.target.value);
        if (event.target.value === 5 || event.target.value === 6) {
            elem.disabled = false;
            elem.variant = 'outlined';
        } else {
            elem.disabled = true;
            elem.variant = 'filled';
        }
    }


    const checkValidity = (data) => {
        var ok = true;
        if (parseInt(data.get('strategy'), 10) === 5) {
            if (data.get('selection') > 1 || data.get('selection') < 0.5) {
                setErrorMessages({name: "tournament", message: errors.tournament});
                ok = false;
            }
        }
        if (parseInt(data.get('strategy'), 10) === 6) {
            if (data.get('selection') > 1 || data.get('selection') < 0) {
                setErrorMessages({name: "truncation", message: errors.truncation});
                ok = false;

            }
        }
        if (parseFloat(data.get('Mutation probebilty'), 10) > 1 || parseFloat(data.get('Mutation probebilty'), 10) < 0) {
            setErrorMessages({name: "truncation", message: errors.truncation});
            ok = false;
        }

        return ok;

    }


    // const popUp = () => 
    //     {
    //         return(
    //         <Alert
    //         onClose={() => {}}
    //         action={
    //             <Link to= "/assign">
    //           <Button color="inherit" size="small">
    //             go to check it
    //           </Button>  
    //           </Link>
    //         }

    //       >
    //         The assignment is ready!
    //       </Alert>
    //         )
    //     }


    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const res = await fetch('/users/get_id_by_email?email=' + props.userid);
        const userId = await res.json();
        if (checkValidity(data)) {
            console.log(data.get('strategy'));
            console.log(props.userid);
            console.log(userId);

            await fetch('/task', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskId: '',
                    userId: userId,
                    date: date.toISOString().split('T')[0],
                    mutationProb: parseFloat(data.get('Mutation probebilty'), 10),
                    selectionStrategy: parseInt(data.get('strategy'), 10),
                    selecDouble: data.get('selection') ? parseFloat(data.get('selection'), 10) : 0.0,
                    maxDuration: data.get('max duration') ? parseInt(data.get('max duration'), 10) : 0,
                    generationCount: data.get('generation count') ? parseInt(data.get('generation count'), 10) : 0,
                    generationLimit: data.get('generation limit') ? parseInt(data.get('generation limit'), 10) : 0,
                    targetFitness: data.get('target fitness') ? parseFloat(data.get('target fitness'), 10) : 0.0,
                    terminationElapsedTime: checked1 ? 1 : 0,
                    terminationGenerationCount: checked2 ? 1 : 0,
                    terminationStagnation: checked3 ? 1 : 0,
                    terminationTargetFitness: checked4 ? 1 : 0,
                    terminationUserAbort: 0
                })
            }).then(async function (response) {
                var resJson = await response.json();
                sessionStorage.setItem("curTaskID", JSON.stringify(resJson));
                var curTaskID = JSON.parse(sessionStorage.getItem("curTaskID"));
                console.log(curTaskID);
                //popUp();


                let intervalId = setInterval(async () => {
                    const resStatus = await fetch(`/assignments/get_status/` + curTaskID)
                        .then((body) => {
                            return (body.text());
                        });
                    console.log("Status: " + resStatus);
                    if (resStatus === "DONE" || resStatus === "done" ) {
                        clearInterval(intervalId);
                        //  popUp();
                        //showAssignment();
                    }
                }, 2000);
            })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }
    return (

        <form onSubmit={handleSubmit}>
            {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          /> */}

            {/* <Alert
        hidden
            onClose={() => {}}
            action={
                <Link to= "/assign">
              <Button color="inherit" size="small">
                go to check it
              </Button>  
              </Link>
            }
            
          >
            The assignment is ready!
          </Alert> */}
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

                        <Typography component="h1" variant="h5">
                            Settings
                        </Typography>
                        <header>please select the setting of the evoluntary engine:</header>
                        <label>Mutation probebilty: </label>
                        <TextField
                            required
                            margin="normal"
                            id="Mutation probebilty"
                            label="Mutation probebilty"
                            name="Mutation probebilty"
                            autoComplete="Mutation probebilty"
                            inputProps={{pattern: "[0-9][0-9.]*[0-9]"}}
                            autoFocus
                            variant="filled"
                        />
                        {renderErrorMessage("truncation")}
                        {renderErrorMessage("tournament")}
                        <FormControl required sx={{m: 1, minWidth: 200}}>
                            <InputLabel>Selection Strategy</InputLabel>
                            <Select
                                labelId="demo-simple-select-disabled-label"
                                id="strategy"
                                name="strategy"
                                value={selectionStrategy}
                                label="Selection strategy*"
                                onChange={onChangeSelection}
                            >
                                {/* add info of each one */}
                                <MenuItem value={1}>Rank Selection</MenuItem>
                                <MenuItem value={2}>Roulette Wheel Selection</MenuItem>
                                <MenuItem value={3}>Sigma Scaling</MenuItem>
                                <MenuItem value={4}>Stochastic Universal Sampling</MenuItem>
                                <MenuItem value={5}>Tournament Selection</MenuItem>
                                <MenuItem value={6}>Truncation Selection</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                id="selection"
                                label="selection"
                                name="selection"
                                autoComplete="selection"
                                inputProps={{pattern: "[0-9][0-9.]*[0-9]"}}
                                disabled={true}
                                autoFocus
                                variant="filled"
                            />
                            {renderErrorMessage("truncation")}
                        </FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    id="1"
                                    checked={checked1}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="Max duration"/>
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]*"}}
                                fullWidth
                                name='max duration'
                                disabled={!checked1}
                                label="please enter the max duration"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    id="2"
                                    checked={checked2}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="generation count"/>
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]"}}
                                fullWidth
                                name="generation count"
                                disabled={!checked2}
                                label="please enter the number of generation"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    id="3"
                                    checked={checked3}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="Stagnation"/>
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]"}}
                                fullWidth
                                name='generation limit'
                                disabled={!checked3}
                                label="please enter the limit number of generation"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    id="4"
                                    checked={checked4}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="Target fitness"/>
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]"}}
                                fullWidth
                                name="target fitness"
                                disabled={!checked4}
                                label="please enter the target fitness"
                            />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {/* <Stack spacing={3}> */}
                            <br></br>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="dd/MM/yyyy"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        {/* </FormControl> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            submit and start the algorithm
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </form>
    );
}
   

    

