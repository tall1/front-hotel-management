import {Button, Card, CardContent, Modal, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import styles from './Rooms.module.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';

import './StyleTable';
import {customColumnStyle, customTableStyle, StyledTableCell, StyledTableRow,} from './StyleTable';

const Assignment = () => {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [assignment, setAssignment] = useState(null);
    const {taskId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch(`/assignments/get_assignment/${taskId}`)
            .then((res) => {
                return res.json();
            })
            .then((assignment) => {
                setAssignment(assignment);
            });
    }, []);

    if (!assignment) return;

    const closeModalHandler = () => {
        setModalIsOpen(false);
        navigate(location.state.basePath);
    };

    const onSave= () => {
        document.getElementById('savedlabel').removeAttribute('hidden');
      
    };

    return (
        <Modal
            className={styles.modal}
            open={modalIsOpen}
            onClose={closeModalHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card className={styles.card} sx={{padding: '1em'}}>
                <Typography
                    sx={{textAlign: 'center'}}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                >
                    {/* {room.roomNumber} */}
                    The Assignment
                </Typography>

                <CardContent id="modal-modal-description" sx={{height: '50%', mt: 2}}>
                    <TableContainer component={Paper}>
                        <Table style={customTableStyle} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={customColumnStyle} align="left">
                                        Reservation Number
                                    </StyledTableCell>
                                    <StyledTableCell style={customColumnStyle} align="left">
                                        Room Number
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(assignment.reservationRoomMap).map(
                                    (reservationNum, i) => (
                                        <StyledTableRow key={reservationNum}>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                                style={{textDecoration: 'none'}}
                                            >
                                                {reservationNum}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                                style={{textDecoration: 'none'}}
                                            >
                                                {Object.values(assignment.reservationRoomMap)[i]}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 2,
                          alignItems: 'center',
                          minWidth: 300,
                        }}
                        >
                 <Button sx={{mt: 1, mb: 2 }} variant='contained' onClick={onSave}>Save Assignment</Button>
                 <Button sx={{ mt: 1, mb: 2 }} variant='contained' onClick={closeModalHandler}>Close</Button>
                 <br></br>
                    </Box>
                    <label className="saved" hidden id="savedlabel">
                    Your assignment was saved successfully!
                    </label>


                </CardContent>
            </Card>
        </Modal>
    );
};
export default Assignment;
