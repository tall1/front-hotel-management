import {Card, CardContent, List, ListItem, Modal, Typography,} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styles from './Rooms.module.css';

const Reservation = () => {
    const featureNames = ["Elevator Adjecent", "Sea View", "Bathtub", "Balcony", "Handicapped Accesible", "High Floor"];
    const importanceNames = ["Not Important", "Nice To Have", "Must"];
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [reservation, setReservation] = useState(null);
    const {reservationNumber} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/reservations/${reservationNumber}`)
            .then((res) => {
                console.log("hi");
                return res.json();
            })
            .then((reservation) => {
                setReservation(reservation);
            });
    }, []);

    if (!reservation) {
        console.log("Closed");
        return;
    }

    const closeModalHandler = () => {
        setModalIsOpen(false);
        navigate('/reservations');
    };
    return (
        <div key={reservationNumber}>
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
                        {/* {reservation.reservationNumber} */}
                        Reservation Details
                    </Typography>
                    <CardContent id="modal-modal-description" sx={{mt: 2}}>
                        <List className={styles.list}>
                            <ListItem className={styles['list-item']}>
                                <label>Reservation Number: </label>
                                <p>{reservation.reservationNumber}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Guest Name: </label>
                                <p>{reservation.guestName}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Checkin: </label>
                                <p>{reservation.checkin}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Checkout: </label>
                                <p>{reservation.checkout}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Feature Importance: </label>
                                <List className={styles.list}>
                                    {reservation?.importanceList.length
                                        ? reservation.importanceList.map((importance, index) => (
                                            <ListItem key={index}>{importance === -1 ? "" : (featureNames[index]+': '+importanceNames[importance-1])} </ListItem>
                                        ))
                                        : null}
                                </List>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};
export default Reservation;
