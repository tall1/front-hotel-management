import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import React from 'react';
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

export default function Assignment() {
    const [assign, setAssign] = useState([]);

    useEffect(() => {
            var curTaskID = JSON.parse(sessionStorage.getItem("curTaskID"));
            var curAssign = JSON.parse(sessionStorage.getItem("curAssign"));

            if ((curTaskID != null) && (curAssign != null)) {
                    console.log("curTaskID: " + sessionStorage.getItem("curTaskID"));
                    const key = Object.entries(curAssign.reservationRoomMap);
                    setAssign(key);
            }
 
    }, []);

    
    return (
       
        <Grid spacing={1} container item xs={12} >
        {assign.length == 0 ? <label> there is no assignment ready for you </label> : 
        <TableContainer component={Paper}>
            <Table style={customTableStyle} aria-label="customized table">
                <TableHead>
                    <TableRow>
                         <StyledTableCell style={customColumnStyle} align="left">Room Number</StyledTableCell>
                         <StyledTableCell style={customColumnStyle} align="left">Reservation Number</StyledTableCell>  
                    </TableRow>
                 </TableHead>
                 <TableBody style={{width: 100}}>
                        {assign.map((key) =>
                                (
                                    <StyledTableRow >
                                    <StyledTableCell align="left">{key[0]}</StyledTableCell>
                                        <StyledTableCell align="left">{key[1]}</StyledTableCell>
                                    </StyledTableRow>
                                )
                                      )}
                                      </TableBody>
                                  </Table>
                              </TableContainer> 
                                }
                          </Grid>
                                

        // <div className='Assignment'>
        //     <header>Assignment</header>
        //     {/* <button onClick={handleClick}>to the Assignment</button> */}
        //     {/* {buttonClicked &&  */}
        //     <div>
        //         <table>
        //             <thead>
        //             <tr>
        //                 <th>room</th>
        //                 <th>reservation</th>
        //             </tr>
        //             </thead>
        //             <tbody>
        //             {assign.map((key) => {
        //                 return (
        //                     <tr key={key}>
        //                         <td>{key[0]}</td>
        //                         <td> {key[1]}</td>
        //                     </tr>
        //                 );
        //             })}
        //             </tbody>
        //         </table>
        //     </div>
        //     {/* } */}

        // </div>
    );
}
