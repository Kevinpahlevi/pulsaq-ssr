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
import { connect } from "react-redux";
import Router from "next/router";
import BackFloating from "../../component/BackFloating";
import PaymentGateway from "../../component/PaymentGateway";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "10px",
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
    tri: { name: "Three Indonesia topup", code: "tri" },
    isat: { name: "Indosat Indonesia topup", code: "isat" },
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

  const dummyDeno = [
    "IDR 15,000",
    "IDR 20,000",
    "IDR 25,000",
    "IDR 30,000",
    "IDR 40,000",
    "IDR 50,000",
    "IDR 75,000",
    "IDR 100,000",
    "IDR 150,000",
    "IDR 200,000",
    "IDR 300,000",
    "IDR 500,000",
  ];

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
      setSelectedProduct({});
      setSelectedProductDenom([]);
      setSelectedDenom("");
      setSelectPayment("");
    } else {
      setSelectedProduct(providerID[finalKey]);
      setSelectedProductDenom(denoID[finalKey]);
    }
  };

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
          <div className={classes.title}>Prepaid - {country}</div>
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
          {country === "ID" && selectedProduct.code && (
            <Grid item>
              <img
                src={`/provider/ID/${selectedProduct.code}.png`}
                style={{
                  height: "100px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Grid>
          )}

          {selectedProduct.code && (
            <Grid item>
              <div className={classes.label}>Amount</div>
              <Grid container direction="row" spacing={1}>
                {dummyDeno.map((item, index) => (
                  <Grid item key={index} xs={4}>
                    <Button
                      color={selectedDenom === item ? "primary" : "default"}
                      variant={
                        selectedDenom === item ? "contained" : "outlined"
                      }
                      onClick={() => setSelectedDenom(item)}
                      fullWidth
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
            <Grid item style={{ marginBottom: "10px" }}>
              <PaymentGateway
                selectPayment={selectPayment}
                setSelectPayment={(a) => setSelectPayment(a)}
              />
            </Grid>
          )}
          {selectPayment !== "" && (
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
      { params: { country: "ID" } },
      { params: { country: "MY" } },
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
