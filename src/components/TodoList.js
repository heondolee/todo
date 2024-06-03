import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import { Box, Button, Typography, Container } from "@mui/material";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };

  return (
    <>
      <Container>
        <Box textAlign="center" mt={2} mb={2}>
          <Typography variant="h4">Todo List</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModal(true)}
          >
            Create Task
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {taskList &&
            taskList.map((obj, index) => (
              <Card
                key={index}
                taskObj={obj}
                index={index}
                deleteTask={deleteTask}
                updateListArray={updateListArray}
              />
            ))}
        </Box>
      </Container>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
