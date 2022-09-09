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

const Task = () => {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [task, setTask] = useState(null);
    const {taskId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/task/${taskId}`)
            .then((res) => {
                return res.json();
            })
            .then((task) => {
                setTask(task);
            });
    }, []);

    if (!task) return;

    const closeModalHandler = () => {
        setModalIsOpen(false);
        navigate('/tasks');
    };
    return (
        <div key={taskId}>
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
                        Task Details
                    </Typography>

                    <CardContent id="modal-modal-description" sx={{mt: 2}}>
                        <List className={styles.list}>
                            <ListItem className={styles['list-item']}>
                                <label>Task Id: </label>
                                <p>{task.taskId}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Target Date: </label>
                                <p>{task.date}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Elitism: </label>
                                <p>{task.elitism}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Population Size: </label>
                                <p>{task.populationSize}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Mutation Probability: </label>
                                <p>{task.mutationProb}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Selection Strategy: </label>
                                <p>{task.selectionStrategy}</p>
                            </ListItem>
                            <ListItem
                                      className={styles['list-item']}>
                                <label>Selection Double: </label>
                                <p>{task.selecDouble}</p>
                            </ListItem>
                            <ListItem
                                      className={styles['list-item']}>
                                <label>Max Duration: </label>
                                <p>{task.maxDuration}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Generation Count: </label>
                                <p>{task.generationCount}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']} >
                                <label>Generation Limit: </label>
                                <p>{task.generationLimit}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Target Fitness: </label>
                                <p>{task.targetFitness}</p>
                            </ListItem>
                            <ListItem className={styles['list-item']}>
                                <label>Termination Conditions: </label>
                                <p>{task.mutationProb}</p>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};
export default Task;
