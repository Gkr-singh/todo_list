import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useStyles } from "../styles/DisplayTaskCss";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { Button, CardActions, Dialog, Grid } from "@mui/material";
import { deleteData, getData, patchData } from "../services/server";
import AddTask from "./AddTask";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

export const DisplayTask = () => {
  var classes = useStyles();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const [open, setOpen] = useState(false);

  // Use useSelector to access data from the Redux store
  const data = Object.values(useSelector((state) => state.todo));
  console.log(data);

  const handleCompleted = async (item) => {
    setIsLoading(true);
    await patchData("posts/" + item.id, { isCompleted: true });
    dispatch({
      type: "ADD",
      payload: [item.uuid, { ...item, isCompleted: true }],
    });
    setRefresh(!refresh);
    setIsLoading(false);
  };

  const handleDelete = async (item) => {
    Swal.fire({
      title: "Do you want to delete the task ?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteData("posts/" + item.id);
        dispatch({ type: "DELETE", payload: [item.uuid] });
        setRefresh(!refresh);

        if (result) {
          Swal.fire("Deleted!", "", "Success");
        } else
          Swal.fire({
            icon: "error",
            title: "Server Error",
          });
      }
    });
  };
  const getAllData = async () => {
    const result = await getData("posts");
    result.forEach((item) => {
      const uuid = Date.now();
      dispatch({
        type: "ADD",
        payload: [uuid, { ...item, isCompleted: false, uuid }],
      });
    });
    setRefresh(!refresh);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const Loader = () => {
    return (
      <div className="loader">
        <CircularProgress color="primary" />
      </div>
    );
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Button onClick={() => setOpen(true)} variant="contained">
          Add Todo
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AddTask setOpen={setOpen} />
      </Dialog>
      <Grid container>
        <div className={classes.mainContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            data.map((item) => (
              <Grid xs={12} sm={12} md={6} lg={6} style={{ display: "grid" }}>
                <div className={classes.box}>
                  <Card style={{ display: "grid" }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2">{item.body}</Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={item.isCompleted}
                            onChange={() =>
                              !item.isCompleted && handleCompleted(item)
                            }
                            color="primary"
                          />
                        }
                        label="Complete Task"
                      />
                      <Button
                        onClick={() => handleDelete(item)}
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </Grid>
            ))
          )}
        </div>
      </Grid>
    </>
  );
};
