import React, { useState } from "react";
import EditTask from "../modals/EditTask";
import {
  Box,
  Button,
  Typography,
  Card as MuiCard,
  CardContent,
  CardActions,
} from "@mui/material";

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
    { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
    { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
    { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
    { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <MuiCard sx={{ maxWidth: 345, m: 2 }}>
      <Box sx={{ bgcolor: colors[index % 5].primaryColor, height: 10 }}></Box>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            bgcolor: colors[index % 5].secondaryColor,
            borderRadius: 1,
            p: 1,
          }}
        >
          {taskObj.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          {taskObj.Description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => setModal(true)}
          sx={{ color: colors[index % 5].primaryColor }}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={handleDelete}
          sx={{ color: colors[index % 5].primaryColor }}
        >
          Delete
        </Button>
      </CardActions>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </MuiCard>
  );
};

export default Card;
