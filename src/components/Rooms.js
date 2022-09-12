import React, {useEffect, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
//
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {customColumnStyle, customTableStyle, StyledTableCell, StyledTableRow} from "./StyleTable";

export default function Rooms() {
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
