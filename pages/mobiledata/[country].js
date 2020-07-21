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
import Confirm from "../../component/ConfirmPurchase";
import Head from "next/head";

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
function data(props) {
  const classes = useStyles();

  const [phone, setPhone] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const [selectedProductDenom, setSelectedProductDenom] = React.useState([]);
  const [selectedDenom, setSelectedDenom] = React.useState("");
  const { country } = props.router.query;

  const providerID = {
    tri: { name: "Three Indonesia topup", code: "three" },
    isat: { name: "Indosat Indonesia topup", code: "indosat" },
    smartfren: { name: "Smartfren Indonesia topup", code: "smartfren" },
    tsel: { name: "Telkomsel Indonesia topup", code: "tsel" },
    xl: { name: "XL Indonesia topup", code: "xl" },
    axis: { name: "Axis Indonesia topup", code: "axis" },
  };

  const code = { ID: "+62", MY: "+60" };
  const denoID = {
    tri: ["IDR 5000", "IDR 10,000", "IDR 50,000"],
    isat: ["IDR 5000", "IDR 20,000", "IDR 50,000"],
    smartfren: ["IDR 5000", "IDR 15,000", "IDR 50,000", "IDR 100,000"],
    tsel: ["IDR 5000", "IDR 10,000", "IDR 50,000"],
    xl: ["IDR 5000", "IDR 20,000", "IDR 50,000"],
    axis: ["IDR 5000", "IDR 15,000", "IDR 50,000", "IDR 100,000"],
  };

  React.useEffect(() => {
    if (country === "ID") {
      IDproduct();
    }
  }, [phone]);

  const IDproduct = () => {
    let finalKey = null;
    if (/^8[125]{1}[123]{1}/gim.test(phone)) finalKey = "tsel";
    else if (/^8(?:[15]{1}[56]{1}|5[78]{1}|14)/gim.test(phone))
      finalKey = "isat";
    else if (/^8(?:[17]{1}[789]{1}|59[^18])/gim.test(phone)) finalKey = "xl";
    else if (/^8(?:3[1238]{1}|59[18])/gim.test(phone)) finalKey = "axis";
    else if (/^89[5-9]{1}/gim.test(phone)) finalKey = "tri";
    else if (/^88[1-9]{1}/gim.test(phone)) finalKey = "smartfren";
    else {
      finalKey = null;
    }

    if (finalKey === null) {
      console.log("null");
      setSelectedProduct({});
      setSelectedProductDenom([]);
    } else {
      console.log("ada");
      setSelectedProduct(providerID[finalKey]);
      setSelectedProductDenom(denoID[finalKey]);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Head>
        <title>Mobile Data</title>
      </Head>
      <Confirm
        open={open}
        handleClose={() => setOpen(false)}
        data={{
          target: code[country] + phone,
          product: selectedProduct,
          denom: selectedDenom,
        }}
      />
      <div className={classes.title}>Data - {country}</div>
      <Paper className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Phone / Bill Number
              </InputLabel>
              <OutlinedInput
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
                labelWidth={150}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Product"
              value={selectedProduct.name || ""}
              placeholder="Insert Phone / Bill Number"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Amount</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDenom}
                onChange={(e) => setSelectedDenom(e.target.value)}
                disabled={selectedProduct.name ? false : true}
              >
                {selectedProductDenom.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {selectedDenom !== "" && (
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

export async function getStaticProps(props) {
  // Call an external API endpoint to get posts
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      // Object variant:
      { params: { country: "ID" } },
      { params: { country: "MY" } },
    ],
    fallback: false,
  };
}
export default withRouter(data);
