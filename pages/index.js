import Head from "next/head";
import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Link from "next/link";
import axios from "axios";
import useSSR from "use-ssr";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PhoneAndroidTwoToneIcon from "@material-ui/icons/PhoneAndroidTwoTone";
import WifiTwoToneIcon from "@material-ui/icons/WifiTwoTone";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import PhoneInTalkTwoToneIcon from "@material-ui/icons/PhoneInTalkTwoTone";
import Flag from "react-world-flags";
import Router, { withRouter } from "next/router";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";
import FlashOnTwoToneIcon from "@material-ui/icons/FlashOnTwoTone";
import LocalHospitalTwoToneIcon from "@material-ui/icons/LocalHospitalTwoTone";
import LocalDrinkTwoToneIcon from "@material-ui/icons/LocalDrinkTwoTone";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 2000,
  lazyLoad: true,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    width: "350px",
    "@media screen and (max-width: 450px)": {
      width: "100%",
    },
    height: "150px",
    padding: "12px",
    marginBottom: "20px",
    border: "3px solid #54c5f5",
    borderRadius: "10px",
  },
  slider: {
    width: "350px",
    "@media screen and (max-width: 450px)": {
      width: "100%",
    },
    marginBottom: "20px",
    " & .slick-prev:before": {
      color: "black",
    },
    "& .slick-next:before": {
      color: "black",
    },
    marginBottom: "30px",
  },
  icon: {
    fontSize: "60px",
    color: "#FF2600",
  },
  text: {
    fontWeight: "bold",
    fontSize: "15px",
  },
  link: {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
  },
  overflowWrap: {
    width: "100%",
    overflowX: "scroll",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none" /* Internet Explorer 10+ */,
    "scrollbar-width": "none" /* Firefox */,
  },
  itemWrap: {
    width: "80px",
    height: "100px",
    display: "inline-block",
  },
  textIcon: {
    fontWeight: "bold",
  },
}));

function input(props) {
  const classes = useStyles();
  const [data, setdata] = React.useState([]);

  React.useEffect(() => {
    console.log(props);
    // fetch();
  }, []);

  async function fetch() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log("fetch useEffect");
    setdata(res.data);
    console.log(res);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>

      <Grid container direction="column" alignItems="center">
        <div className={classes.slider}>
          <Slider {...settings}>
            <div>
              <img src="https://via.placeholder.com/350x150/ff2600/FFFFFF/?text=adv1" />
            </div>
            <div>
              <img src="https://via.placeholder.com/350x150/ff2600/FFFFFF/?text=adv2" />
            </div>
            <div>
              <img src="https://via.placeholder.com/350x150/ff2600/FFFFFF/?text=adv3" />
            </div>
            <div>
              <img src="https://via.placeholder.com/350x150/ff2600/FFFFFF/?text=adv4" />
            </div>
          </Slider>
        </div>
        <Paper className={classes.paper}>
          <Grid container direction="column" style={{ width: "100%" }}>
            <Grid item>
              <Grid container direction="column">
                <div className={classes.text}>Indonesia</div>
              </Grid>
            </Grid>
            <Grid item style={{ width: "100%", marginTop: "10px" }}>
              <div className={classes.overflowWrap} id="scrollMe">
                <Link href="/prepaid/[country]" as="/prepaid/ID">
                  <a className={classes.link}>
                    <div className={classes.itemWrap}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <PhoneAndroidTwoToneIcon className={classes.icon} />
                        </Grid>
                        <Grid item className={classes.textIcon}>
                          Isi Pulsa
                        </Grid>
                      </Grid>
                    </div>
                  </a>
                </Link>
                <Link href="/mobiledata/[country]" as="/mobiledata/ID">
                  <a className={classes.link}>
                    <div className={classes.itemWrap}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <WifiTwoToneIcon className={classes.icon} />
                        </Grid>
                        <Grid item className={classes.textIcon}>
                          Paket Data
                        </Grid>
                      </Grid>
                    </div>
                  </a>
                </Link>
                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <ConfirmationNumberTwoToneIcon className={classes.icon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Voucher
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <FlashOnTwoToneIcon className={classes.icon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Token PLN
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <LocalHospitalTwoToneIcon className={classes.icon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      BPJS
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <LocalDrinkTwoToneIcon className={classes.icon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      PDAM
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <AccountBalanceWalletTwoToneIcon
                        className={classes.icon}
                      />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      e-Money
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>

        {/* MALAYSIA */}
        <Paper className={classes.paper}>
          <Grid container direction="column" style={{ width: "100%" }}>
            <Grid item>
              <Grid container direction="column">
                <div className={classes.text}>Malaysia</div>
              </Grid>
            </Grid>
            <Grid item style={{ width: "100%", marginTop: "10px" }}>
              <div className={classes.overflowWrap}>
                <Link href="/prepaid/[country]" as="/prepaid/MY">
                  <a className={classes.link}>
                    <div className={classes.itemWrap}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <PhoneAndroidTwoToneIcon className={classes.icon} />
                        </Grid>
                        <Grid item className={classes.textIcon}>
                          Isi Pulsa
                        </Grid>
                      </Grid>
                    </div>
                  </a>
                </Link>
                <Link href="/postpaid/[country]" as="/postpaid/MY">
                  <a className={classes.link}>
                    <div className={classes.itemWrap}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <PhoneInTalkTwoToneIcon className={classes.icon} />
                        </Grid>
                        <Grid item className={classes.textIcon}>
                          Postpaid
                        </Grid>
                      </Grid>
                    </div>
                  </a>
                </Link>
                <Link href="/postpaid/[country]" as="/postpaid/MY">
                  <a className={classes.link}>
                    <div className={classes.itemWrap}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <AccountBalanceWalletTwoToneIcon
                            className={classes.icon}
                          />
                        </Grid>
                        <Grid item className={classes.textIcon}>
                          Billing
                        </Grid>
                      </Grid>
                    </div>
                  </a>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Paper>

        {/* INTERNASIONAL */}
        <Paper className={classes.paper}>
          <Grid container direction="column" style={{ width: "100%" }}>
            <Grid item>
              <Grid container direction="column">
                <div className={classes.text}>Internasional</div>
              </Grid>
            </Grid>
            <Grid item style={{ width: "100%", marginTop: "10px" }}>
              <div className={classes.overflowWrap}>
                <Link href="/prepaid/[country]" as="/prepaid/ID">
                  <a className={classes.link}>
                    <div className={classes.itemWrap}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <PhoneAndroidTwoToneIcon className={classes.icon} />
                        </Grid>
                        <Grid item className={classes.textIcon}>
                          Isi Pulsa
                        </Grid>
                      </Grid>
                    </div>
                  </a>
                </Link>
                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <AccountBalanceWalletTwoToneIcon
                        className={classes.icon}
                      />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Prepaid
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/* </div> */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    name: state.name,
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

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       test: res.data,
//     },
//   };
// }

const edit = connect(mapStateToProps, mapDispatchToProps)(input);
export default withRouter(edit);
