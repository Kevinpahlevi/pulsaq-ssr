import React from "react";
import { withRouter } from "next/router";

function billing(props) {
  return <div>billing {props.router.query.country}</div>;
}

export default withRouter(billing);
