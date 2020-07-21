import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Barcode from "react-barcode";

export default function AlertDialog({ open, handleClose, type }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
      >
        <DialogTitle id="alert-dialog-title">{"Payment Barcode"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bayar di outlet {type} terdekat dengan scan barcode dibawah ini.
          </DialogContentText>
          <Barcode
            value="id-pulsaq-order-prepaid"
            width={1}
            height={100}
            displayValue={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
