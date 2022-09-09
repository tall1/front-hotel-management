import {
    Card,
    CardContent,
    List,
    ListItem,
    Modal,
    Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styles from './Rooms.module.css';

const Room = () => {
    const featureNames = ["Elevator Adjecent", "Sea View", "Bathtub", "Balcony", "Handicapped Accesible", "High Floor"];
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [room, setRoom] = useState(null);
    const {roomId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/rooms/${roomId}`)
            .then((res) => {
                console.log("hi");
                return res.json();
            })
            .then((room) => {
                setRoom(room);
            });
    }, []);

    if (!room) return;

    const closeModalHandler = () => {
        setModalIsOpen(false);
        navigate('/rooms');
    };
    return (
        <div key={roomId}>
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
                        Room Details
                    </Typography>
                    <CardContent id="modal-modal-description" sx={{mt: 2}}>
                        <List className={styles.list}>
                            <ListItem className={styles['list-item']}>
                                <label>Room Number: </label>
                                <p>{room.roomNumber}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Floor: </label>
                                <p>{room.floorNumber}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Room Capacity</label>
                                <p>{room.roomCapacity}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Available Date</label>
                                <p>{room.availableDate}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Features: </label>
                                <List className={styles.list}>
                                    {room?.featureIdsList.length
                                        ? room.featureIdsList.map((feature) => (
                                            <ListItem key={feature}>{featureNames[feature-1]}</ListItem>
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
export default Room;
