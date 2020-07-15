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

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    width: "150px",
    height: "150px",
    borderRadius: "25px",
    backgroundColor: "#2b87ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    fontSize: "100px",
    color: "white",
  },
  text: {
    textAlign: "center",
    width: "150px",
  },
  link: {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
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
      <div>
        <Grid container direction="row" justify="center" spacing={2}>
          {/* Indonesia */}
          <Grid item>
            <Link href={`/prepaid?country=ID`}>
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <div>
                    <Flag code="ID" height="16" />
                  </div>
                  <div>
                    <PhoneAndroidTwoToneIcon className={classes.icon} />
                  </div>
                </Paper>
                <div className={classes.text}>Mobile Prepaid Indonesia</div>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`/data?country=ID`}>
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <div>
                    <Flag code="ID" height="16" />
                  </div>
                  <div>
                    <WifiTwoToneIcon className={classes.icon} />
                  </div>
                </Paper>
                <div className={classes.text}>
                  Mobile Data <br></br>Indonesia
                </div>
              </a>
            </Link>
          </Grid>
          {/* // MALAYSIA */}
          <Grid item>
            <Link href={`/prepaid?country=MY`}>
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <div>
                    <Flag code="MY" height="16" />
                  </div>
                  <div>
                    <PhoneAndroidTwoToneIcon className={classes.icon} />
                  </div>
                </Paper>
                <div className={classes.text}>Mobile Prepaid Malaysia</div>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`/postpaid?country=MY`}>
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <div>
                    <Flag code="MY" height="16" />
                  </div>
                  <div>
                    <PhoneInTalkTwoToneIcon className={classes.icon} />
                  </div>
                </Paper>
                <div className={classes.text}>
                  Mobile Postpaid <br></br>Malaysia
                </div>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`/billing?country=MY`}>
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <div>
                    <Flag code="MY" height="16" />
                  </div>
                  <div>
                    <AccountBalanceWalletTwoToneIcon className={classes.icon} />
                  </div>
                </Paper>
                <div className={classes.text}>
                  Billing Payment <br></br>Malaysia
                </div>
              </a>
            </Link>
          </Grid>
        </Grid>
      </div>
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

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      test: res.data,
    },
  };
}

const edit = connect(mapStateToProps, mapDispatchToProps)(input);
export default withRouter(edit);
