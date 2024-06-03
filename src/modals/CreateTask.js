import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTaskPopup = ({ modal, toggle, save }) => {
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

    const handleSave = (e) => {
        e.preventDefault();
        let taskObj = {};
        taskObj["Name"] = taskName;
        taskObj["Description"] = description;
        taskObj["Category"] = category;
        taskObj["Deadline"] = deadline;
        save(taskObj);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Create Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the details of the new task.
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
                <Button color="primary" onClick={handleSave}>Create</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskPopup;
