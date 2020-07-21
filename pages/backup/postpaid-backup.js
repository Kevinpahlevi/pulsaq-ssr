import React from "react";
import { withRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Grid } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Flag from "react-world-flags";
// import Confirm from "../component/ConfirmBill";

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "250px",
    padding: "20px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
}));
function postpaid(props) {
  const classes = useStyles();

  const [phone, setPhone] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState("");

  const providerMY = [
    { signature: "11", name: "MAXIS Bill Payment", code: "maxis" },
    { signature: "22", name: "DIGI Bill Payment", code: "digi" },
    { signature: "33", name: "CELCOM Bill Payment", code: "celcom" },
  ];

  const code = { ID: "+62", MY: "+60" };
  const currency = { ID: "IDR", MY: "MYR" };
  const { country } = props.router.query;

  return (
    <div>
      {/* <Confirm
        open={open}
        handleClose={() => setOpen(false)}
        data={{
          product: selectedProduct,
          phone: code[country] + phone,
          amount: amount,
          currency: currency[country],
        }}
      /> */}
      <div className={classes.title}>Postpaid - {country}</div>
      <Paper className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedProduct}
                placeholder="Select product"
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {providerMY.map((item, index) => (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Phone / Bill Number
              </InputLabel>
              <Input
                id="outlined-adornment-amount"
                value={phone}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setPhone(e.target.value);
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">
                    {code[country] || ""}
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel htmlFor="input-amount">Amount</InputLabel>
              <Input
                id="input-amount"
                value={amount}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setAmount(e.target.value);
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">MYR</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            {selectedProduct !== "" && phone && amount && (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                BUY
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withRouter(postpaid);