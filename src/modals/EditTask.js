import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    // 각 입력 필드의 상태를 관리
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    // 입력 필드 값이 변경될 때 호출되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    // taskObj가 변경될 때마다 해당 값을 입력 필드에 설정
    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setCategory(taskObj.Category);
        setDeadline(new Date(taskObj.Deadline));
    }, [taskObj]);

    // 업데이트 버튼 클릭 시 호출되는 함수
    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {};
        tempObj['Name'] = taskName;
        tempObj['Description'] = description;
        tempObj['Category'] = category;
        tempObj['Deadline'] = deadline;
        updateTask(tempObj);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please update the details of the task.
                </DialogContentText>
                <TextField
                    label="Task Name"
                    variant="outlined"
                    fullWidth
                    value={taskName}
                    onChange={handleChange}
                    name="taskName"
                    margin="dense"
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={5}
                    value={description}
                    onChange={handleChange}
                    name="description"
                    margin="dense"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={handleChange}
                        name="category"
                        label="Category"
                    >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Shopping">Shopping</MenuItem>
                    </Select>
                </FormControl>
                <DatePicker
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="datepicker"
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleUpdate}>Update</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopup;
