import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ open, handleClose, confirm, data }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Purchase"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description"></DialogContentText> */}
          <div>{data.product.name}</div>
          <div>{data.denom}</div>
          <div>{data.target}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            autoFocus
            variant="contained"
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
