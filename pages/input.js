import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

function input({ name, changeNameAction }) {
  return (
    <div>
      <div>input {name}</div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => changeNameAction(e.target.value)}
        />
      </div>
      <div>
        <Button color="primary" variant="outlined">
          <Link href="/">
            <a style={{ textDecoration: "none" }}>home</a>
          </Link>
        </Button>
      </div>
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

const edit = connect(mapStateToProps, mapDispatchToProps)(input);
export default edit;
