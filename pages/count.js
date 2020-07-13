// import Link from "next/link";
import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";
// import React from "react";

// function page(props) {
//   React.useEffect(() => {
//     console.log(props);
//   }, []);

//   return (
//     <div>
//       <div>input {props.count.count}</div>
//       <div>
//         <Button color="primary" variant="outlined">
//           <Link href="/">
//             <a style={{ textDecoration: "none" }}>home</a>
//           </Link>
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default connect((state) => state)(page);

import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";

function input({ count, addCountAction }) {
  React.useEffect(() => {
    // console.log(props);
  }, []);
  return (
    <div>
      <div>count {count}</div>
      <div>
        <Button
          onClick={() => addCountAction()}
          color="secondary"
          variant="contained"
        >
          add
        </Button>
      </div>
      <div>
        <Link href="/">
          <Button color="primary" variant="outlined">
            <a style={{ textDecoration: "none" }}>home</a>
          </Button>
        </Link>
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
