import React from "react";
import { DashboardAction } from "./context";

function Cards() {
  const { val } = React.useContext(DashboardAction);

  return <div>{val}</div>;
}

export default Cards;
