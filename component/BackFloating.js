import React from "react";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    left: 10,
    bottom: 20,
    zIndex: 100,
    position: "absolute",
  },
}));
export default function BackFloating() {
  const classes = useStyles();

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => Router.back()}
      >
        <ArrowBackIcon />
      </Fab>
    </div>
  );
}
