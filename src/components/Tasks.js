
import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Link, Outlet } from 'react-router-dom';
import {
  customColumnStyle,
  customTableStyle,
  StyledTableCell,
  StyledTableRow,
} from './StyleTable';

export default function Tasks() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      '/task/get_tasks_by_date/?userID=' +
        sessionStorage.getItem('userId') +
        '&date=' +
        date.toISOString().split('T')[0]
    );
    const tasksArr = await response.json();
    setTasks(tasksArr.reverse());
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleLastTask = async (event) => {
    event.preventDefault();
    const response = sessionStorage.getItem('curTaskID')
      ? await fetch('/task/' + sessionStorage.getItem('curTaskID'))
      : null;
    if (response) {
      const task = await response.json();
      setTasks([task]);
    }
  };

  const taskTable = (
    <>
      <Grid spacing={1} container item xs={12}>
        <TableContainer component={Paper}>
          <Table style={customTableStyle} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={customColumnStyle} align="left">
                  Task Id
                </StyledTableCell>
                <StyledTableCell style={customColumnStyle} align="left">
                  Target Date
                </StyledTableCell>
                <StyledTableCell style={customColumnStyle} align="left">
                  Assignment
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ width: 100 }}>
              {tasks.map((task) => (
                <StyledTableRow key={task.taskId}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ textDecoration: 'none' }}
                  >
                    <Link className={'table-link'} to={`/tasks/${task.taskId}`}>
                      {task.taskId}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ textDecoration: 'none' }}
                  >
                    {task.date}
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ textDecoration: 'none' }}
                  >
                    <Link
                      className={'table-link'}
                      component="button"
                      variant="body2"
                      to={`/tasks/assignment/${task.taskId}`}
                      state={{ basePath: '/tasks' }}
                    >
                      Assignment
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Outlet />
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack align="center" spacing={2}>
            <Typography component="h1" variant="h5">
              Tasks
            </Typography>
            <header>Please select the date for assignments:</header>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            {/* </FormControl> */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                minWidth: 300,
              }}
            >
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Find Tasks
              </Button>
              <Button
                onClick={handleLastTask}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Show Last Task
              </Button>
            </Box>
          </Stack>
        </Box>
        <div>{tasks.length ? taskTable : null}</div>
      </Container>
    </ThemeProvider>
  );
}
