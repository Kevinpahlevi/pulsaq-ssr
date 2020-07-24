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
    padding: "12px 0px 12px 12px",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  imgSlide: {
    width: "98%",
    borderRadius: "10px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
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
    "& .slick-dots": {
      bottom: "10px",
    },
    marginBottom: "10px",
    marginTop: "20px",
  },
  icon: {
    fontSize: "50px",
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
  itemWrapFlag: {
    width: "90px",
    height: "100px",
    display: "inline-block",
  },
  textIcon: {
    fontWeight: "bold",
  },
  imgIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
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
              <img src="/img1.png" className={classes.imgSlide} />
            </div>
            <div>
              <img src="/img2.png" className={classes.imgSlide} />
            </div>
            <div>
              <img src="/img3.png" className={classes.imgSlide} />
            </div>
            <div>
              <img src="/img4.png" className={classes.imgSlide} />
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
                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <img src="/digi.png" className={classes.imgIcon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Digi
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <img src="/hotlink.png" className={classes.imgIcon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Hotlink
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <img src="/maxis.png" className={classes.imgIcon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Maxis
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <img src="/celcom.jpg" className={classes.imgIcon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Celcom
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.itemWrap}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <img src="/umobile.png" className={classes.imgIcon} />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Umobile
                    </Grid>
                  </Grid>
                </div>
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
                <div className={classes.itemWrapFlag}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Flag code="BD" height="50" width="65" />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Bangladesh
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.itemWrapFlag}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Flag code="NPL" height="50" width="65" />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Nepal
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.itemWrapFlag}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Flag code="PH" height="60" width="75" />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Phillippines
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.itemWrapFlag}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Flag code="MMR" height="50" width="65" />
                    </Grid>
                    <Grid item className={classes.textIcon}>
                      Myanmar
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
