import {useEffect, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import React from 'react';
//
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width: 100,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const customTableStyle = {
    width: '100%',
    align: 'left',
    padding: '5px',
    margin: '0 auto',
};
const customColumnStyle = {
    maxWidth: '100px',
    backgroundColor: '#1976D2',
    padding: '5px',
};

export default function Rooms1() {
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        fetch('/rooms/get_rooms_by_user_id/' + sessionStorage.getItem('userId'))
            .then((res) => {
                return res.json();
            })
            .then((rooms) => {
                setRooms(rooms);
            });
    }, []);

    console.log({rooms});
    if (!rooms) return;
    return (
        <>
            <Grid spacing={1} container item xs={12}>
                <TableContainer component={Paper}>
                    <Table style={customTableStyle} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={customColumnStyle} align="left">
                                    Room Number
                                </StyledTableCell>
                                <StyledTableCell style={customColumnStyle} align="left">
                                    floor
                                </StyledTableCell>
                                <StyledTableCell style={customColumnStyle} align="left">
                                    capacity
                                </StyledTableCell>
                                <StyledTableCell style={customColumnStyle} align="left">
                                    availableDate
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{width: 100}}>
                            {rooms.map((room) => (
                                <StyledTableRow key={room.roomNumber}>
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <Link className={'table-link'} to={`/rooms/${room.id}`}>
                                            {room.roomNumber}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {room.floorNumber}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {room.roomCapacity}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {room.availableDate}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Outlet/>
        </>
    );
}
