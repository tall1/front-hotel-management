import React, { useState } from 'react';
import { Button, FormControlLabel, FormGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {ThemeProvider, useTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Tooltip from '@mui/material/Tooltip';
import { Stack } from '@mui/system';
import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  customColumnStyle,
  customTableStyle,
  StyledTableCell,
  StyledTableRow,
} from './StyleTable';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [selectionStrategy, setSelectionStrategy] = useState('1');
  const [errorMessages, setErrorMessages] = useState('');
  const [currentVariant, setCurrentVariant] = useState('filled');
  const [currentDisabled, setCurrentDisabled] = useState(true);
  const [running, setRunning] = useState(false);
  const [chart, setChart] = useState([]);
  const [dots, setDots] = useState([
    {
      time: 0,
      maxFitness: 0.0,
      fitness: 0.0,
      generation: 0,
    },
  ]);
  const theme = useTheme();
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [status, setStatus] = useState({
    statusId: 0,
    statusStr: '',
    maxFitness: 0,
    curFitness: 0,
    curGeneration: 0,
    elapsedTime: 0,
  });
  const [date, setDate] = useState(new Date("2022-08-05"));

  const errors = {
    tournament: 'The value must be between 0.5 - 1',
    truncation: 'The value must be between 0 - 1',
  };

  const fitnessChart = (
    <LineChart
      width={500}
      height={300}
      data={dots}
      margin={{
        top: 5,
        right: 100,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      {/*<Tooltip />*/}
      <Legend />
      <Line type="monotone" dataKey="maxFitness" stroke="#800080" />
      {/*<Line type="monotone" dataKey="generation" stroke="#8884d8"/>*/}
      <Line type="monotone" dataKey="fitness" stroke="#82ca9d" />
    </LineChart>
  );

  const progressTable = (
    <Grid
      className="statusTable"
      sx={{
        display: { xs: 'none', lg: 'block' },
      }}
      spacing={1}
      container
      item
      xs={12}
    >
      <TableContainer component={Paper}>
        <Table style={customTableStyle} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={customColumnStyle} align="left">
                Status
              </StyledTableCell>
              <StyledTableCell style={customColumnStyle} align="left">
                Progress %
              </StyledTableCell>
              <StyledTableCell style={customColumnStyle} align="left">
                Maximum Fitness
              </StyledTableCell>
              <StyledTableCell style={customColumnStyle} align="left">
                Current Fitness
              </StyledTableCell>
              <StyledTableCell style={customColumnStyle} align="left">
                Current Generation
              </StyledTableCell>
              <StyledTableCell style={customColumnStyle} align="left">
                Elapsed Time
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ width: 100 }}>
            <StyledTableRow>
              <StyledTableCell align="left">
                {status.statusStr.toLowerCase()}
              </StyledTableCell>
              <StyledTableCell align="left">
                {status.progressPercent}
              </StyledTableCell>
              <StyledTableCell align="left">
                {status.maxFitness}
              </StyledTableCell>
              <StyledTableCell align="left">
                {status.curFitness}
              </StyledTableCell>
              <StyledTableCell align="left">
                {status.curGeneration}
              </StyledTableCell>
              <StyledTableCell align="left">
                {status.elapsedTime}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const handleChange = (event) => {
        switch (event.target.id) {
            case '1':
                setChecked1(event.target.checked);
                break;
            case '2':
                setChecked2(event.target.checked);
                break;
            case '3':
                setChecked3(event.target.checked);
                break;
            case '4':
                setChecked4(event.target.checked);
            // eslint-disable-next-line no-fallthrough
            default:
                break;
        }
    };

  const onChangeSelection = (event) => {
    setSelectionStrategy(event.target.value);
    if (event.target.value === '5' || event.target.value === '6') {
      setCurrentDisabled(false);
      setCurrentVariant('outlined');
    } else {
      setCurrentDisabled(true);
      setCurrentVariant('filled');
    }
  };

  const checkValidity = (data) => {
    var ok = true;
    if (selectionStrategy === '5') {
      if (data.get('selection') > 1 || data.get('selection') < 0.5) {
        setErrorMessages({ name: 'tournament', message: errors.tournament });
        ok = false;
      }
    }
    if (selectionStrategy === '6') {
      if (data.get('selection') > 1 || data.get('selection') < 0) {
        setErrorMessages({ name: 'truncation', message: errors.truncation });
        ok = false;
      }
    }
    if (
      parseFloat(data.get('Mutation probability'), 10) > 1 ||
      parseFloat(data.get('Mutation probability'), 10) < 0
    ) {
      setErrorMessages({ name: 'truncation', message: errors.truncation });
      ok = false;
    }
    if (!checked1 && !checked2 && !checked3 && !checked4) {
      setErrorMessages({
        name: 'terminationCondition',
        message: errors.terminationCondition,
      });
      ok = false;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDots([
            {
                time: 0,
                fitness: 0.0,
                generation: 0,
            },
        ]);
        setRunning(true);
        setChart([]);
        const data = new FormData(event.currentTarget);
        if (checkValidity(data)) {
            console.log('Valid request. userid: ' + sessionStorage.getItem('userId'));
            await fetch('/task', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskId: '',
                    userId: sessionStorage.getItem('userId'),
                    date: date.toISOString().split('T')[0],
                    elitism: data.get('elitism') ? parseInt(data.get('elitism'), 10) : 0,
                    populationSize: data.get('population_size')
                        ? parseInt(data.get('population_size'), 10)
                        : 0,
                    mutationProb: parseFloat(data.get('Mutation probability'), 10),
                    selectionStrategy: selectionStrategy,
                    selecDouble: data.get('selection')
                        ? parseFloat(data.get('selection'), 10)
                        : 0.0,
                    maxDuration: data.get('max duration')
                        ? parseInt(data.get('max duration') * 1000, 10)
                        : 0,
                    generationCount: data.get('generation count')
                        ? parseInt(data.get('generation count'), 10)
                        : 0,
                    generationLimit: data.get('generation limit')
                        ? parseInt(data.get('generation limit'), 10)
                        : 0,
                    targetFitness: data.get('target fitness')
                        ? parseFloat(data.get('target fitness'), 10)
                        : 0.0,
                    terminationElapsedTime: checked1 ? 1 : 0,
                    terminationGenerationCount: checked2 ? 1 : 0,
                    terminationStagnation: checked3 ? 1 : 0,
                    terminationTargetFitness: checked4 ? 1 : 0,
                    terminationUserAbort: 0,
                }),
            })
                .then(async function (response) {
                    if (response.status === 400) {
                    }
                    const resJson = await response.json();
                    sessionStorage.setItem('curTaskID', JSON.stringify(resJson));
                    const curTaskID = JSON.parse(sessionStorage.getItem('curTaskID'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDots([
      {
        time: 0,
        maxFitness: 0.0,
        fitness: 0.0,
        generation: 0,
      },
    ]);
    setRunning(true);
    setChart([]);
    const data = new FormData(event.currentTarget);
    if (!checkValidity(data)) return;
    console.log('Valid request. userid: ' + sessionStorage.getItem('userId'));
    try {
      const taskRes = await fetch('/task', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: '',
          userId: sessionStorage.getItem('userId'),
          date: date.toISOString().split('T')[0],
          elitism: data.get('elitism') ? parseInt(data.get('elitism'), 10) : 0,
          populationSize: data.get('population_size')
            ? parseInt(data.get('population_size'), 10)
            : 0,
          mutationProb: parseFloat(data.get('Mutation probability'), 10),
          selectionStrategy: selectionStrategy,
          selecDouble: data.get('selection')
            ? parseFloat(data.get('selection'), 10)
            : 0.0,
          maxDuration: data.get('max duration')
            ? parseInt(data.get('max duration') * 1000, 10)
            : 0,
          generationCount: data.get('generation count')
            ? parseInt(data.get('generation count'), 10)
            : 0,
          generationLimit: data.get('generation limit')
            ? parseInt(data.get('generation limit'), 10)
            : 0,
          targetFitness: data.get('target fitness')
            ? parseFloat(data.get('target fitness'), 10)
            : 0.0,
          terminationElapsedTime: checked1 ? 1 : 0,
          terminationGenerationCount: checked2 ? 1 : 0,
          terminationStagnation: checked3 ? 1 : 0,
          terminationTargetFitness: checked4 ? 1 : 0,
          terminationUserAbort: 0,
        }),
      });

      if (taskRes.status === 400) {
        console.log('Failed to fetch task id', taskRes);
      }
      const taskId = await taskRes.json();
      setCurrentTaskId(taskId);
      sessionStorage.setItem('curTaskID', JSON.stringify(taskId));

      let intervalId = setInterval(async () => {

        // let alerted = false;
        const assignmentStatusRes = await fetch(
          `/assignments/get_status/` + sessionStorage.getItem('curTaskID')
        );
        if (assignmentStatusRes.status === 400) {
          console.log('Failed to fetch assignment status', taskRes);
        }
        const assignmentStatus = await assignmentStatusRes.json();
        setStatus(assignmentStatus);
        if (assignmentStatus.statusStr.toLowerCase() === 'in_progress') {
          dots.push(
            {
              time: Math.floor(assignmentStatus.elapsedTime / 100),
              maxFitness: assignmentStatus.maxFitness,
              fitness: assignmentStatus.curFitness,
              generation: assignmentStatus.curGeneration,
            }
          );
        }
        if (
          assignmentStatus.statusStr === 'DONE' ||
          assignmentStatus.statusStr === 'done'
        ) {
          clearInterval(intervalId);
          navigate(
            `/settings/assignment/${sessionStorage.getItem('curTaskID')}`,
            { state: { basePath: '/settings' } }
          );
          setChart([fitnessChart]);
        }
      }, 100);
    } catch (err) {
      console.log('Failed to fetch', err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Stack
              direction={{ xs: 'column', sm: 'column' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Typography align="center" component="h1" variant="h">
                Settings
              </Typography>
              <Typography align="center" component="h1" variant="h6">
                please select the setting of the evolutionary engine:
              </Typography>
              <br></br>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 1, md: 4 }}
                alignItems="center"
              >
                <Box
                  sx={{
                    marginTop: 0,
                    marginLeft: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    maxWidth: 300,
                  }}
                >
                  <label>please choose the termination condition:</label>
                  <FormGroup>
                    <Tooltip
                      placement="top"
                      title="Terminates evolution after a pre-determined period of time has elapsed."
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="1"
                            checked={checked1}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        }
                        label="Max duration"
                      />
                    </Tooltip>

                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      fullWidth
                      name="max duration"
                      defaultValue="5"
                      disabled={!checked1}
                      label="please enter the max duration(in seconds)"
                    />
                    <Tooltip
                      placement="top"
                      title="Terminates evolution after a set number of generations have passed."
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="2"
                            checked={checked2}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        }
                        label="generation count"
                      />
                    </Tooltip>
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]' }}
                      fullWidth
                      name="generation count"
                      disabled={!checked2}
                      label="please enter the number of generation"
                    />
                    <Tooltip
                      placement="top"
                      title="A Termination Condition that halts evolution if no improvement in fitness is observed within a specified number of generations."
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="3"
                            checked={checked3}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        }
                        label="Stagnation"
                      />
                    </Tooltip>
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]' }}
                      fullWidth
                      name="generation limit"
                      disabled={!checked3}
                      label="please enter the limit number of generation"
                    />
                    <Tooltip
                      placement="top"
                      title="Terminates evolution once at least one candidate in the population has equalled or bettered a pre-determined fitness score."
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="4"
                            checked={checked4}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        }
                        label="Target fitness"
                      />
                    </Tooltip>
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]' }}
                      fullWidth
                      name="target fitness"
                      disabled={!checked4}
                      label="please enter the target fitness"
                    />
                    {renderErrorMessage('terminationCondition')}
                  </FormGroup>
                </Box>
                <Box
                  sx={{
                    marginTop: 0,
                    marginLeft: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    maxWidth: 300,
                  }}
                >
                  <FormControl>
                    <FormLabel id="startegy">Selection Strategy</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Rank Selection"
                      name="startegy"
                      value={selectionStrategy}
                      onChange={onChangeSelection}
                    >
                      <Tooltip
                        placement="top"
                        title="A selection strategy that is similar to fitness-proportionate selection except that is uses relative fitness rather than absolute fitness in order to determine the probability of selection for a given individual"
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio  />}
                          label="Rank Selection"
                        />
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="Implements selection of n candidates from a population by selecting n candidates at random where the probability of each candidate getting selected is proportional to its fitness score."
                      >
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="Roulette Wheel Selection"
                        />
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="An alternative to straightforward fitness-proportionate selection such as that offered by RouletteWheelSelection and StochasticUniversalSampling."
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="Sigma Scaling"
                        />
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="An alternative to RouletteWheelSelection as a fitness-proportionate selection strategy."
                      >
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="Stochastic Universal Sampling"
                        />
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="Selection strategy that picks a pair of candidates at random and then selects the fitter of the two candidates with probability p, where p is the configured selection probability (therefore the probability of the less fit candidate being selected is 1 - p)."
                      >
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="Tournament Selection"
                        />
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title="Implements selection of n candidates from a population by simply selecting the n candidates with the highest fitness scores (the rest are discarded)."
                      >
                        <FormControlLabel
                          value="6"
                          control={<Radio />}
                          label="Truncation Selection"
                        />
                      </Tooltip>
                    </RadioGroup>
                  </FormControl>
                  {renderErrorMessage('truncation')}
                  {renderErrorMessage('tournament')}

                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="selection"
                    label="Selection"
                    name="selection"
                    autoComplete="selection"
                    inputProps={{ pattern: '[0-9][0-9.]*[0-9]' }}
                    autoFocus
                    disabled={currentDisabled}
                    variant={currentVariant}
                  />
                  {renderErrorMessage('truncation')}
                </Box>
                <Box
                  sx={{
                    marginTop: 0,
                    marginLeft: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    maxWidth: 300,
                  }}
                >
                  <Stack spacing={2}>
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      fullWidth
                      name="elitism"
                      defaultValue="6"
                      label="please enter the elitism"
                    />
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      fullWidth
                      name="population_size"
                      defaultValue="51"
                      label="Population Size"
                    />
                    <TextField
                      required
                      id="Mutation probability"
                      label="Mutation probability"
                      name="Mutation probability"
                      defaultValue="0.3"
                      autoComplete="Mutation probability"
                      inputProps={{ pattern: '[0-9][0-9.]*[0-9]' }}
                      autoFocus
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                      variant="contained"
                      sx={{
                        maxWidth: 300,
                      }}
                    >
                      submit and start the algorithm
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
            <br />
            <br />
            <div align="center">{running ? progressTable : null}</div>
            <br />
            <br />
            <div align="center">{chart}</div>
          </Container>
        </ThemeProvider>
      </form>
      <Outlet />
    </>
  );
}
