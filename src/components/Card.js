import React, { useState } from 'react';
import EditTaskPopup from '../modals/EditTask';
import { Box, Button, Typography, Card as MuiCard, CardContent, CardActions, Checkbox } from '@mui/material';

const Card = ({ taskObj, index, deleteTask, updateListArray, handleComplete }) => {
    const [modal, setModal] = useState(false);

    // 각 카테고리에 대한 색상 설정
    const colors = {
        Work: { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        Personal: { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        Shopping: { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" }
    };

    // 기본 색상 설정
    const defaultColor = { primaryColor: "#808080", secondaryColor: "#E0E0E0" };
    const taskColor = colors[taskObj?.Category] || defaultColor;

    // 모달의 표시 여부를 토글하는 함수
    const toggle = () => {
        setModal(!modal);
    };

    // 할 일을 업데이트하는 함수
    const updateTask = (obj) => {
        updateListArray(obj, taskObj.id);
    };

    // 할 일을 삭제하는 함수
    const handleDelete = () => {
        deleteTask(taskObj.id);
    };

    return (
        <MuiCard sx={{ maxWidth: 345, m: 2 }}>
            <Box sx={{ bgcolor: taskColor.primaryColor, height: 10 }}></Box>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ bgcolor: taskColor.secondaryColor, borderRadius: 1, p: 1 }}>
                    {taskObj?.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                    {taskObj?.Description}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                    Deadline: {taskObj?.Deadline ? new Date(taskObj.Deadline).toLocaleString() : 'No deadline'}
                </Typography>
            </CardContent>
            <CardActions>
                <Checkbox checked={taskObj?.Completed || false} onChange={() => handleComplete(taskObj.id)} />
                <Button size="small" onClick={toggle} sx={{ color: taskColor.primaryColor }}>
                    Edit
                </Button>
                <Button size="small" onClick={handleDelete} sx={{ color: taskColor.primaryColor }}>
                    Delete
                </Button>
            </CardActions>
            <EditTaskPopup modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MuiCard>
    );
};

export default Card;
