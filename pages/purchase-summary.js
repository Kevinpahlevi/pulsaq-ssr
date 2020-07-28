import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Router, { withRouter } from "next/router";
import BarcodePop from "../component/Barcode";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: "20px",
  },
  bold: {
    marginTop: "20px",
    marginBottom: "5px",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    fontSize: "15px",
    marginBottom: "20px",
  },
  tr: {
    borderCollapse: "collapse",
  },
  name: {
    borderCollapse: "collapse",
    width: "80px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
}));

function paymentPage(props) {
  const classes = useStyles();
  const { payment } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log(props);
    if (
      Object.keys(props.payment).length === 0 &&
      props.payment.constructor === Object
    ) {
      Router.push("/");
    }
  }, []);

  const handleConfirm = () => {
    setOpen(false);
    Router.push("/");
  };

  return (
    <div>
      <BarcodePop
        open={open}
        handleClose={() => setOpen(false)}
        handleConfirm={() => handleConfirm()}
      />
      <Paper className={classes.paper}>
        <div className={classes.title}>Purchase Summary</div>
        <table className={classes.table}>
          <tbody>
            <tr className={classes.tr}>
              <td className={classes.name}>Type</td>
              <td>: {payment.type} </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Country</td>
              <td>: {payment.country}</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Phone</td>
              <td>: {payment.phone}</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Product</td>
              <td>
                : {payment.selectedProduct ? payment.selectedProduct.name : ""}
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Denom</td>
              <td>: {payment.selectedDenom}</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Price</td>
              <td>: {payment.selectedDenom}</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.name}>Payment</td>
              <td>: {payment.selectPayment}</td>
            </tr>
          </tbody>
        </table>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          size="small"
          onClick={() => setOpen(true)}
        >
          Confirm Purchase
        </Button>
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
