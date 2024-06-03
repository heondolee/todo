import React, { useEffect, useState } from 'react';
import CreateTaskPopup from '../modals/CreateTask';
import Card from './Card';
import { Box, Button, Typography, Container } from '@mui/material';

const TodoList = () => {
    // 할 일 생성 모달의 표시 여부를 제어하는 상태
    const [modal, setModal] = useState(false);
    // 할 일 목록을 저장하는 상태
    const [taskList, setTaskList] = useState([]);

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 할 일 목록을 가져옴
    useEffect(() => {
        const storedTasks = localStorage.getItem("taskList");
        if (storedTasks) {
            setTaskList(JSON.parse(storedTasks));
        }
    }, []);

    // 할 일을 삭제하는 함수
    const deleteTask = (index) => {
        const tempList = taskList.filter((_, i) => i !== index);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    // 할 일 목록을 업데이트하는 함수
    const updateListArray = (obj, index) => {
        const tempList = taskList.map((item, i) => (i === index ? obj : item));
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    // 모달의 표시 여부를 토글하는 함수
    const toggle = () => {
        setModal(!modal);
    };

    // 새로운 할 일을 저장하는 함수
    const saveTask = (taskObj) => {
        const tempList = [...taskList, taskObj];
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    // 할 일의 완료 상태를 토글하는 함수
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