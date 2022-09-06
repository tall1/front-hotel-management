import {useState} from 'react';
import {AppBar, Button, FormControlLabel, FormGroup} from '@mui/material';
import {Button, FormControlLabel, FormGroup, Stack} from '@mui/material';
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
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { Stack } from '@mui/system';
 import '../App.css';

export default function Settings(props) {

    const [selectionStrategy, setSelectionStrategy] = useState("");
    const [errorMessages, setErrorMessages] = useState("");
    const theme = useTheme();
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [status, setStatus] = useState({
        "statusId": 0,
        "statusStr": "",
        "maxFitness": 0,
        "curFitness": 0,
        "curGeneration": 0,
        "elapsedTime": 0
    });
    const [date, setDate] = useState(new Date());
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const handleTooltip = (bool) => {
        setTooltipOpen(bool)
    }

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
        terminationCondition: " You must choose one of the termination condition",

    };

    const onChangeSelection = (event) => {
        var elem = document.getElementById('selection');
        setselectionStrategy(event.target.value);
        handleTooltip(false);
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
        if (parseFloat(data.get('Mutation probability'), 10) > 1 || parseFloat(data.get('Mutation probability'), 10) < 0) {
            setErrorMessages({name: "truncation", message: errors.truncation});
            ok = false;
        }
        if (!checked1 && !checked2 && !checked3 && !checked4)
        {
            setErrorMessages({ name: "terminationCondition", message: errors.terminationCondition});   
            ok=false;
        }

        return ok;

    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        if (checkValidity(data)) {
            console.log("Valid request. userid: " + sessionStorage.getItem("userId"));
            await fetch('/task', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskId: '',
                    userId: sessionStorage.getItem("userId"),
                    date: date.toISOString().split('T')[0],
                    elitism: data.get('elitism') ? parseInt(data.get('elitism'), 10) : 0,
                    populationSize: data.get('population_size') ? parseInt(data.get('population_size'), 10) : 0,
                    mutationProb: parseFloat(data.get('Mutation probability'), 10),
                    selectionStrategy: selectionStrategy,
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

                let intervalId = setInterval(async () => {
                    const resStatus = await fetch(`/assignments/get_status/` + curTaskID).then(response => response.json());
                    console.log("Status: " + JSON.stringify(resStatus));
                    setStatus(resStatus);
                    // Check if working on page change:
                    //const resAssign = await fetch("/assignments/get_assignment/" + curTaskID) 
                    //const jsonResAssign = await resAssign.json();
                    //sessionStorage.setItem("curAssign", JSON.stringify(jsonResAssign))
                    //alert("your assignment is ready - go to check it");
                    if (resStatus.statusStr === "DONE" || resStatus.statusStr === "done") {

                        clearInterval(intervalId);
                    
                    }
                }, 100);
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return (

        <form  className="firstCol" onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline/>
                    <Typography component="h1" variant="h5">
                            Settings
                        </Typography>
                        <header>please select the setting of the evolutionary engine:</header>
                        <Stack spacing={1}>
                {/*<Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >*/}
                    <Box 
                        sx={{
                            marginTop: 8,
                            marginLeft:0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            maxWidth:300
                        }}
                    >  
                    
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
                        <FormControl required sx={{m: 1, minWidth: 300}}>
                            <InputLabel>Selection Strategy</InputLabel>
                            <Tooltip
                              disabletriggerfocus= "true"
                              title= "Various selection strategies for use with evolutionary algorithms."
                              placement="top"
                              open={tooltipOpen}>
                            <Select
                             
                                labelId="demo-simple-select-disabled-label"
                                id="strategy"
                                name="strategy"
                                value={selectionStrategy}
                                label="Selection strategy*"
                                onChange={onChangeSelection}
                                onMouseEnter={() => {handleTooltip(true)}}
                                onMouseLeave={() => {handleTooltip(false)}}
                             >   
                             {/* <Tooltip placement="top" title="A selection strategy that is similar to fitness-proportionate selection except that is uses relative fitness rather than absolute fitness in order to determine the probability of selection for a given individual"> */}
                                {/* <div> */}
                                <MenuItem value={1}>Rank Selection</MenuItem>
                                {/* </div> */}
                                {/* </Tooltip> */}
                             {/* <Tooltip placement="top" title="Implements selection of n candidates from a population by selecting n candidates at random where the probability of each candidate getting selected is proportional to its fitness score."> */}
                                {/* <div> */}
                                <MenuItem value={2}>Roulette Wheel Selection</MenuItem>
                                {/* </div> */}
                                {/* </Tooltip> */}
                             {/* <Tooltip placement="top" title="An alternative to straightforward fitness-proportionate selection such as that offered by RouletteWheelSelection and StochasticUniversalSampling."> */}
                                {/* <div> */}
                                <MenuItem value={3}>Sigma Scaling</MenuItem>
                                {/* </div> */}
                                {/* </Tooltip> */}
                             {/* <Tooltip placement="top" title="An alternative to RouletteWheelSelection as a fitness-proportionate selection strategy."> */}
                                {/* <div> */}
                                <MenuItem value={4}>Stochastic Universal Sampling</MenuItem>
                                {/* </div> */}
                                {/* </Tooltip> */}
                             {/* <Tooltip placement="top" title="Selection strategy that picks a pair of candidates at random and then selects the fitter of the two candidates with probability p, where p is the configured selection probability (therefore the probability of the less fit candidate being selected is 1 - p)."> */}
                                {/* <div> */}
                                <MenuItem value={5}>Tournament Selection</MenuItem>
                                {/* </div> */}
                                {/* </Tooltip> */}
                             {/* <Tooltip placement="top" title="Implements selection of n candidates from a population by simply selecting the n candidates with the highest fitness scores (the rest are discarded)."> */}
                                {/* <div> */}
                                <MenuItem value={6}>Truncation Selection</MenuItem>
                                {/* </div> */}
                                {/* </Tooltip> */}
                            </Select>
                            </Tooltip>
                            <FormHelperText>Required</FormHelperText>
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                id="selection"
                                label="Selection"
                                name="selection"
                                autoComplete="selection"
                                inputProps={{pattern: "[0-9][0-9.]*[0-9]"}}
                                autoFocus
                                variant="filled"
                            />
                            {renderErrorMessage("truncation")}
                        </FormControl>
                        {/* </Box> */}
                        
                        {/* <Box
                        
                         sx={{
                            marginTop: 0,
                            marginLeft:70,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            maxWidth:300
                        }}
                        > */}
                        <FormGroup>
                        <Stack spacing={1}>
                        <Tooltip placement="top" title="Terminates evolution after a pre-determined period of time has elapsed.">
                            <FormControlLabel
                                control={<Checkbox
                                    id="1"
                                    checked={checked1}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="Max duration"/>
                            </Tooltip>
                           
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]*"}}
                                fullWidth
                                name='max duration'
                                disabled={!checked1}
                                label="please enter the max duration"
                            />
                            <Tooltip placement="top" title="Terminates evolution after a set number of generations have passed.">
                            <FormControlLabel
                                control={<Checkbox
                                    id="2"
                                    checked={checked2}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="generation count"/>
                            </Tooltip>
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]"}}
                                fullWidth
                                name="generation count"
                                disabled={!checked2}
                                label="please enter the number of generation"
                            />
                            <Tooltip placement="top" title="A Termination Condition that halts evolution if no improvement in fitness is observed within a specified number of generations.">
                            <FormControlLabel
                                control={<Checkbox
                                    id="3"
                                    checked={checked3}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="Stagnation"/>
                            </Tooltip>
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]"}}
                                fullWidth
                                name='generation limit'
                                disabled={!checked3}
                                label="please enter the limit number of generation"
                            />
                            <Tooltip placement="top" title="Terminates evolution once at least one candidate in the population has equalled or bettered a pre-determined fitness score.">
                            <FormControlLabel
                                control={<Checkbox
                                    id="4"
                                    checked={checked4}
                                    onChange={handleChange}
                                    inputProps={{"aria-label": "primary checkbox"}}
                                />}
                                label="Target fitness"/>
                            </Tooltip>
                            <TextField
                                inputProps={{inputMode: 'numeric', pattern: "[0-9]"}}
                                fullWidth
                                name="target fitness"
                                disabled={!checked4}
                                label="please enter the target fitness"
                            />
                            {renderErrorMessage("terminationCondition")}
                            </Stack>
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

                        {<div>
                            <table>
                                <thead>
                                <tr>
                                    <th>status</th>
                                    <th>max fitness</th>
                                    <th>current fitness</th>
                                    <th>current generation</th>
                                    <th>elapsed time</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr key={status.statusId}>
                                    <td> {status.statusStr.toLowerCase()}</td>
                                    <td> {status.maxFitness}</td>
                                    <td> {status.curFitness}</td>
                                    <td> {status.curGeneration}</td>
                                    <td> {status.elapsedTime}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>}
                    </Box>
                </Container>
            </ThemeProvider>
        </form>
    );
}
   

    

