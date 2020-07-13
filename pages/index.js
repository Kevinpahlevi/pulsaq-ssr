import Head from "next/head";
import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/index.module.css";
import useSSR from "use-ssr";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function input({ count, name, test }) {
  const classes = useStyles();
  const [data, setdata] = React.useState([]);

  React.useEffect(() => {
    console.log(test);
    fetch();
  }, []);

  const CheckENV = () => {
    var { isBrowser, isServer, isNative } = useSSR();

    // Want array destructuring? You can do that too!
    // var [isBrowser, isServer, isNative] = useSSR();

    /*
     * In your browser's chrome devtools console you should see
     * > IS BROWSER: 👍
     * > IS SERVER: 👎
     *
     * AND, in your terminal where your server is running you should see
     * > IS BROWSER: 👎
     * > IS SERVER: 👍
     */
    console.log("IS BROWSER: ", isBrowser ? "👍" : "👎");
    console.log("IS SERVER: ", isServer ? "👍" : "👎");
    console.log("IS NATIVE: ", isNative ? "👍" : "👎");
    return <div>Is in browser? {isBrowser ? "👍" : "👎"}</div>;
  };

  async function fetch() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log("fetch useEffect");
    setdata(res.data);
    console.log(res);
  }

  return (
    <div className={styles.root}>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div>{data[0] && data[0].title}</div>
      <div>{test.title}</div>

      <div>
        <Link href="/count">
          <Button variant="contained" color="primary">
            <a>Count {count}</a>
          </Button>
        </Link>
      </div>
      <div>
        <Link href="/input">
          <Button variant="contained" color="primary">
            <a>Input {name}</a>
          </Button>
        </Link>
      </div>
      {/* <CheckENV /> */}
    </div>
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

// export async function getServerSideProps() {
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
export default edit;
