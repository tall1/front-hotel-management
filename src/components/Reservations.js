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


export default function Reservations() {
    const [reservations, setReservations] = useState(null);

    useEffect(() => {
        fetch("/reservations/get_reservations_by_user_id/" + sessionStorage.getItem("userId"))
            .then((res) => {
                return res.json()
            })
            .then((reservations) => {
                setReservations(reservations)
            });
    }, []);


    console.log({reservations});
    if (!reservations) return;
    return (
        <>
            <Grid spacing={1} container item xs={12}>
                <TableContainer component={Paper}>
                    <Table style={customTableStyle} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={customColumnStyle} align="left">Reservation
                                    Number</StyledTableCell>
                                <StyledTableCell style={customColumnStyle} align="left">Guest Name</StyledTableCell>
                                <StyledTableCell style={customColumnStyle} align="left">Guests
                                    Amount</StyledTableCell>
                                <StyledTableCell style={customColumnStyle} align="left">Checkin</StyledTableCell>
                                <StyledTableCell style={customColumnStyle} align="left">Checkout</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{width: 100}}>
                            {reservations.map((reservation) =>
                                (
                                    <StyledTableRow key={reservation.reservationNumber}>
                                        <StyledTableCell component="th" scope="row"
                                                         style={{textDecoration: 'none'}}>
                                            <Link className={'table-link'}
                                                  to={`/reservations/${reservation.reservationNumber}`}>
                                                {reservation.reservationNumber}
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{reservation.guestName}</StyledTableCell>
                                        <StyledTableCell align="left">{reservation.guestsAmount}</StyledTableCell>
                                        <StyledTableCell align="left">{reservation.checkin}</StyledTableCell>
                                        <StyledTableCell align="left">{reservation.checkout}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Outlet/>
        </>
    );
}