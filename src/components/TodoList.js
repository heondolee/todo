import React, { useEffect, useState } from 'react';
import CreateTaskPopup from '../modals/CreateTask';
import Card from './Card';
import { Box, Button, Typography, Container } from '@mui/material';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("taskList");
        if (storedTasks) {
            setTaskList(JSON.parse(storedTasks));
        }
    }, []);

    const deleteTask = (index) => {
        const tempList = taskList.filter((_, i) => i !== index);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        const tempList = taskList.map((item, i) => (i === index ? obj : item));
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        const tempList = [...taskList, taskObj];
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    const handleComplete = (index) => {
        const tempList = taskList.map((item, i) => {
            if (i === index) {
                return { ...item, Completed: !item.Completed };
            }
            return item;
        });
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    return (
        <>
            <Container>
                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4">Todo List</Typography>
                    <Button variant="contained" color="primary" onClick={toggle}>
                        Create Task
                    </Button>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    {taskList && taskList.map((obj, index) => (
                        <Card
                            key={index}
                            taskObj={obj}
                            index={index}
                            deleteTask={deleteTask}
                            updateListArray={updateListArray}
                            handleComplete={handleComplete}
                        />
                    ))}
                </Box>
            </Container>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;
