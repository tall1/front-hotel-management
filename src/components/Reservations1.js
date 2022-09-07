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

const customTableStyle = {width: "100%", align: "left", padding: "5px", margin: "0 auto"};
const customColumnStyle = {maxWidth: "100px", backgroundColor: "#1976D2", padding: "5px"};


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