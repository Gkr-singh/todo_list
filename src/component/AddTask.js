import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useStyles } from "../styles/AddTaskCss";
import { postData } from "../services/server";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function AddTask(props) {
  var classes = useStyles();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };
  const validation = () => {
    var isValid = true;
    if (!title) {
      handleError("title", "please input title");
      isValid = false;
    }
    if (!body) {
      handleError("body", "please input body");
      isValid = false;
    }
    return isValid;
  };

  const clearValue = () => {
    setTitle("");
    setBody("");
  };

  const handleClick = async () => {
    if (validation()) {
      var bodydata = {
        title: title,
        body: body,
        userId: 2345,
      };
      var result = await postData("posts", bodydata);
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Task Added",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
        });
      }
      const uuid = Date.now();
      dispatch({
        type: "ADD",
        payload: [uuid, { ...result, isCompleted: false, uuid }],
      });

      clearValue();
      props.setOpen(false);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.rowStyle}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={classes.headingStyle}>Add Task</div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={!error.title ? false : true}
            helperText={error.title}
            onFocus={() => handleError("title", null)}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            label="Title"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            error={!error.body ? false : true}
            helperText={error.body}
            onFocus={() => handleError("body", null)}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            fullWidth
            label="Body"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6}>
          <Button onClick={handleClick} fullWidth variant="contained">
            Submit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={clearValue} fullWidth variant="contained">
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
