import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    left: 10,
    bottom: 20,
    zIndex: 100,
    position: "absolute",
  },
  icon: {
    width: "70px",
    height: "70px",
    border: "1px solid grey",
  },
  iconSelect: {
    width: "70px",
    height: "70px",
    border: "2px solid red",
  },
  title: {
    color: "grey",
    marginBottom: "10px",
  },
}));

export default function PaymentGateway({ selectPayment, setSelectPayment }) {
  const classes = useStyles();
  const listPayment = [
    { name: "7-eleven" },
    { name: "KK Mart" },
    { name: "99 Speedmart" },
    { name: "Happy Mart" },
  ];

  React.useEffect(() => {
    // console.log(selectPayment);
    // console.log(setSelectPayment);
  }, []);

  return (
    <div>
      <div className={classes.title}>Payment Gateway</div>
      <Grid container spacing={1}>
        {listPayment.map((item) => (
          <Grid item key={item.name}>
            <img
              src={`/payments/${item.name}.png`}
              className={
                selectPayment === item.name ? classes.iconSelect : classes.icon
              }
              alt={item.name}
              onClick={() => setSelectPayment(item.name)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
