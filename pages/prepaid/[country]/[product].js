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
import Confirm from "../../../component/ConfirmPurchase";
import Head from "next/head";
import { connect } from "react-redux";
import Router from "next/router";
import BackFloating from "../../../component/BackFloating";
import PaymentGateway from "../../../component/PaymentGateway";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  selected: {
    border: "2px solid #d10000",
  },
  label: {
    color: "grey",
    marginBottom: "10px",
  },
}));
function prepaid(props) {
  const classes = useStyles();

  React.useEffect(() => {
    console.log(props);
  }, []);

  const { country } = props.router.query;

  const [phone, setPhone] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const [selectedProductDenom, setSelectedProductDenom] = React.useState([]);
  const [selectedDenom, setSelectedDenom] = React.useState("");
  const [selectPayment, setSelectPayment] = React.useState("");

  const providerID = {
    altel: { name: "ALTEL pinless topup", code: "altel" },
    as2in1: { name: "AS2IN1 pinless topup", code: "as2in1" },
    celcom: { name: "CELCOM pinless topup", code: "celcom" },
    digi: { name: "DIGI pinless topup", code: "digi" },
    hotlink: { name: "HOTLINK pinless topup", code: "hotlink" },
    merchantrade: { name: "MERCHANTRADE pinless topup", code: "merchantrade" },
    tunetalk: { name: "TUNE TALK pinless topup", code: "tunetalk" },
    umobile: { name: "UMOBILE pinless topup", code: "umobile" },
    xox: { name: "XOX pinless topup", code: "xox" },
    yes: { name: "YES pinless topup", code: "yes" },
  };

  const code = { ID: "+62", MY: "+60" };
  const denoID = {
    altel: ["MYR 5", "MYR 10", "MYR 20"],
    as2in1: ["MYR 5", "MYR 15", "MYR 25"],
    celcom: ["MYR 5", "MYR 15", "MYR 20", "MYR 50"],
    digi: ["MYR 5", "MYR 10", "MYR 20"],
    hotlink: ["MYR 5", "MYR 15", "MYR 25"],
    merchantrade: ["MYR 5", "MYR 15", "MYR 20", "MYR 50"],
    tunetalk: ["MYR 5", "MYR 10", "MYR 20"],
    umobile: ["MYR 5", "MYR 15", "MYR 25"],
    xox: ["MYR 5", "MYR 15", "MYR 20", "MYR 50"],
    yes: ["MYR 5", "MYR 15", "MYR 25"],
  };

  React.useEffect(() => {
    const { product } = props.router.query;
    setSelectedProduct(providerID[product]);
    setSelectedProductDenom(denoID[product]);
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const isConfirm = () => {
    const { addPayment } = props;
    addPayment({
      country: country,
      type: "Prepaid",
      selectedProduct,
      selectedDenom,
      phone,
      selectPayment,
    });
    Router.push("/purchase-summary");
  };

  return (
    <div>
      <Head>
        <title>Mobile Prepaid</title>
      </Head>
      <Confirm
        open={open}
        handleClose={() => setOpen(false)}
        data={{
          target: code[country] + phone,
          product: selectedProduct,
          denom: selectedDenom,
        }}
        confirm={isConfirm}
      />
      <BackFloating />
      <Paper className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          <div className={classes.title}>Mobile Prepaid Malaysia</div>
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
            {selectedProduct.code && (
              <img
                src={`/provider/MY/${selectedProduct.code}.png`}
                style={{
                  height: "100px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            )}
          </Grid>
          {selectedProduct.code && (
            <Grid item>
              <div className={classes.label}>Amount</div>
              <Grid container direction="row" spacing={1}>
                {selectedProductDenom.map((item, index) => (
                  <Grid item key={index}>
                    <Button
                      variant={
                        selectedDenom === item ? "contained" : "outlined"
                      }
                      onClick={() => setSelectedDenom(item)}
                      color={selectedDenom === item ? "primary" : "default"}
                      size="small"
                    >
                      {item}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {selectedDenom !== "" && (
            <Grid item>
              <PaymentGateway
                selectPayment={selectPayment}
                setSelectPayment={(a) => setSelectPayment(a)}
              />
            </Grid>
          )}
          {selectPayment !== "" && phone !== "" && (
            <Grid item>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => isConfirm()}
              >
                Purchase
              </Button>
            </Grid>
          )}
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
      { params: { country: "MY", product: "altel" } },
      { params: { country: "MY", product: "as2in1" } },
      { params: { country: "MY", product: "celcom" } },
      { params: { country: "MY", product: "digi" } },
      { params: { country: "MY", product: "hotlink" } },
      { params: { country: "MY", product: "merchantrade" } },
      { params: { country: "MY", product: "tunetalk" } },
      { params: { country: "MY", product: "umobile" } },
      { params: { country: "MY", product: "xox" } },
      { params: { country: "MY", product: "yes" } },
    ],
    fallback: false,
  };
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    name: state.name,
    payment: state.payment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCountAction: () => {
      dispatch({ type: "ADD_COUNT" });
    },
    changeNameAction: (name) => {
      dispatch({ type: "CHANGE_NAME", value: name });
    },
    addPayment: (payment) => {
      dispatch({ type: "ADD_PAYMENT", value: payment });
    },
  };
};

const prepaidPage = connect(mapStateToProps, mapDispatchToProps)(prepaid);

export default withRouter(prepaidPage);
