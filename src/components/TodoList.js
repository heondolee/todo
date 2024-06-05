import React, { useEffect, useState } from 'react';
import CreateTaskPopup from '../modals/CreateTask';
import Card from './Card';
import { Box, Button, Typography, Container } from '@mui/material';

const TodoList = () => {
    // 할 일 생성 모달의 표시 여부를 제어하는 상태
    const [modal, setModal] = useState(false);
    // 할 일 목록을 저장하는 상태
    const [taskList, setTaskList] = useState([]);
    // ID 상태를 저장하는 상태
    const [id, setId] = useState(0);

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 할 일 목록을 가져옴
    useEffect(() => {
        const storedTasks = localStorage.getItem("taskList");
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            setTaskList(tasks);
            // 기존 작업 중 가장 높은 ID를 찾아 설정
            const maxId = tasks.length ? Math.max(...tasks.map(task => task.id)) : 0;
            setId(maxId + 1);
        }
    }, []);

    // 할 일을 삭제하는 함수
    const deleteTask = (taskId) => {
        const tempList = taskList.filter(task => task.id !== taskId);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    // 할 일 목록을 업데이트하는 함수
    const updateListArray = (obj, taskId) => {
        const tempList = taskList.map(task => (task.id === taskId ? obj : task));
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    // 모달의 표시 여부를 토글하는 함수
    const toggle = () => {
        setModal(!modal);
    };

    // 새로운 할 일을 저장하는 함수
    const saveTask = (taskObj) => {
        taskObj.id = id;
        const tempList = [...taskList, taskObj];
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setId(id + 1);
        setModal(false);
    };

    // 할 일의 완료 상태를 토글하는 함수
    const handleComplete = (taskId) => {
        const tempList = taskList.map(task => {
            if (task.id === taskId) {
                return { ...task, Completed: !task.Completed };
            }
            return task;
        });
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    // 완료된 할 일 목록
    const completedTasks = taskList.filter(task => task.Completed);
    // 미완료된 할 일 목록
    const incompleteTasks = taskList.filter(task => !task.Completed);

    return (
        <>
            <Container>
                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4">Todo List</Typography>
                    <Button variant="contained" color="primary" onClick={toggle}>
                        Create Task
                    </Button>
                </Box>
                <Box mt={2} mb={2}>
                    <Typography variant="h5">Incomplete Tasks</Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        {incompleteTasks.map((obj, index) => (
                            <Card
                                key={obj.id}
                                taskObj={obj}
                                index={index}
                                deleteTask={deleteTask}
                                updateListArray={updateListArray}
                                handleComplete={handleComplete}
                            />
                        ))}
                    </Box>
                </Box>
                <Box mt={2} mb={2}>
                    <Typography variant="h5">Completed Tasks</Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        {completedTasks.map((obj, index) => (
                            <Card
                                key={obj.id}
                                taskObj={obj}
                                index={index}
                                deleteTask={deleteTask}
                                updateListArray={updateListArray}
                                handleComplete={handleComplete}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;
