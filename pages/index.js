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
    width: "350px",
    height: "50px",
    borderRadius: "15px",
    paddingTop: "10px",
    border: "1px solid #FF2600",
  },
  icon: {
    fontSize: "30px",
    color: "#FF2600",
  },
  text: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#FF2600",
    paddingTop: "0px",
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
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {/* Indonesia */}
          <Grid item>
            <Link href="/prepaid/[country]" as="/prepaid/ID">
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                      <Grid container direction="column" alignItems="center">
                        <div>
                          <PhoneAndroidTwoToneIcon className={classes.icon} />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <div className={classes.text}>
                        Mobile Prepaid Indonesia
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/mobiledata/[country]" as="/mobiledata/ID">
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                      <Grid container direction="column" alignItems="center">
                        <div>
                          <WifiTwoToneIcon className={classes.icon} />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <div className={classes.text}>Mobile Data Indonesia</div>
                    </Grid>
                  </Grid>
                </Paper>
              </a>
            </Link>
          </Grid>
          {/* // MALAYSIA */}
          <Grid item>
            <Link href="/prepaid/[country]" as="/prepaid/MY">
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                      <Grid container direction="column" alignItems="center">
                        <div>
                          <PhoneAndroidTwoToneIcon className={classes.icon} />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <div className={classes.text}>
                        Mobile Prepaid Malaysia
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/postpaid/[country]" as="/postpaid/MY">
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                      <Grid container direction="column" alignItems="center">
                        <div>
                          <PhoneInTalkTwoToneIcon className={classes.icon} />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <div className={classes.text}>
                        Mobile Postpaid Malaysia
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/billing/[country]" as="/billing/MY">
              <a className={classes.link}>
                <Paper className={classes.paper}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                      <Grid container direction="column" alignItems="center">
                        <div>
                          <AccountBalanceWalletTwoToneIcon
                            className={classes.icon}
                          />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <div className={classes.text}>
                        Billing Payment Malaysia
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
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
