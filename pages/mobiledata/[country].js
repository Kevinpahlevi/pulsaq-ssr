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

  const providerID = [
    { signature: "89", name: "Three Indonesia data package", code: "three" },
    {
      signature: "81",
      name: "Indosat Indonesia data package",
      code: "indosat",
    },
    {
      signature: "88",
      name: "Smartfren Indonesia data package",
      code: "smartfren",
    },
  ];

  const providerMY = [
    { signature: "11", name: "Altel Malaysia topup", code: "altel" },
    { signature: "22", name: "Buzzme Malaysia topup", code: "buzzme" },
    { signature: "33", name: "Celcom Malaysia topup", code: "celcom" },
  ];

  const code = { ID: "+62", MY: "+60" };
  const denoID = {
    three: ["1GB - IDR 5000", "2,5GB - IDR 10,000", "15GB - IDR 50,000"],
    indosat: ["500MB - IDR 5000", "2,5GB - IDR 20,000", "6GB - IDR 50,000"],
    smartfren: [
      "1GB - IDR 5000",
      "4GB - IDR 15,000",
      "15GB - IDR 50,000",
      "35GB - IDR 100,000",
    ],
  };
  const denoMY = {
    altel: ["MYR 5.00", "MYR 10.00"],
    buzzme: ["MYR 5.00", "MYR 10.00", "MYR 15.00"],
    celcom: ["MYR 5.00", "MYR 10.00", "MYR 20.00", "MYR 50.00"],
  };

  const { country } = props.router.query;

  React.useEffect(() => {
    if (country === "ID") {
      IDproduct();
    } else if (country === "MY") {
      MYproduct();
    }
  }, [phone]);

  const IDproduct = () => {
    const regex = { three: /^89/, indosat: /^81/, smartfren: /^88/ };
    if (regex.three.test(phone)) {
      console.log("3");
      setSelectedProduct(providerID[0]);
      setSelectedProductDenom(denoID.three);
    } else if (regex.indosat.test(phone)) {
      console.log("indosat");
      setSelectedProduct(providerID[1]);
      setSelectedProductDenom(denoID.indosat);
    } else if (regex.smartfren.test(phone)) {
      console.log("smartfren");
      setSelectedProduct(providerID[2]);
      setSelectedProductDenom(denoID.smartfren);
    } else {
      setSelectedProduct({});
      setSelectedProductDenom([]);
    }
  };

  const MYproduct = () => {
    const regex = { altel: /^11/, buzzme: /^22/, celcom: /^33/ };
    if (regex.altel.test(phone)) {
      setSelectedProduct(providerMY[0]);
      setSelectedProductDenom(denoMY.altel);
    } else if (regex.buzzme.test(phone)) {
      setSelectedProduct(providerMY[1]);
      setSelectedProductDenom(denoMY.buzzme);
    } else if (regex.celcom.test(phone)) {
      setSelectedProduct(providerMY[2]);
      setSelectedProductDenom(denoMY.celcom);
    } else {
      setSelectedProduct({});
      setSelectedProductDenom([]);
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
                onChange={(e) => setPhone(e.target.value)}
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
