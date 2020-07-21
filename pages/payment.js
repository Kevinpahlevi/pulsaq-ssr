import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Router, { withRouter } from "next/router";
import BarcodePop from "../component/Barcode";

const useStyles = makeStyles((theme) => ({
  root: {},
  logoPayment: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  paper: {
    minHeight: "250px",
    padding: "20px",
  },
  bold: {
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "5px",
  },
  table: {
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
    fontSize: "13px",
    fontWeight: "bold",
  },
  tr: {
    border: "1px solid black",
    borderCollapse: "collapse",
  },
  name: {
    border: "1px solid black",
    borderCollapse: "collapse",
    color: "white",
    background: "#FF2600",
    width: "100px",
  },
}));

function paymentPage(props) {
  const classes = useStyles();
  const { payment } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedPay, setSeletecedPay] = React.useState("");

  React.useEffect(() => {
    console.log(props);
    if (
      Object.keys(props.payment).length === 0 &&
      props.payment.constructor === Object
    ) {
      Router.push("/");
    }
  }, []);

  return (
    <div>
      <BarcodePop
        open={open}
        handleClose={() => setOpen(false)}
        type={selectedPay}
      />
      <Paper className={classes.paper}>
        <table className={classes.table}>
          <tbody>
            <tr className={classes.tr}>
              <td className={classes.name}>Type</td>
              <td> {payment.type} </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Country</td>
              <td>{payment.country}</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Phone</td>
              <td>{payment.phone}</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Product</td>
              <td>
                {payment.selectedProduct ? payment.selectedProduct.name : ""}
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Denom</td>
              <td>{payment.selectedDenom}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <div className={classes.bold}>Select Payment :</div>
          <div>
            <img
              src="/711.png"
              className={classes.logoPayment}
              onClick={() => {
                setOpen(true);
                setSeletecedPay("7-11");
              }}
            />
            <img
              src="/razer.png"
              className={classes.logoPayment}
              onClick={() => {
                setOpen(true);
                setSeletecedPay("Razer Pay");
              }}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
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
  };
};

const payment = connect(mapStateToProps, mapDispatchToProps)(paymentPage);
export default withRouter(payment);