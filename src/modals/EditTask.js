import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState(new Date());

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

    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setCategory(taskObj.Category);
        setDeadline(new Date(taskObj.Deadline));
    }, [taskObj]);

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
