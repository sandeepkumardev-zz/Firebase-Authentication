import React from "react";
import { useData } from "../../contexts";
import { withRouter } from "react-router-dom";

const withHome = (Component) => {
  function WithHome(props) {
    const { data } = useData();

    if (!data.user) {
      props.history.push("/signin");
    }

    return <Component />;
  }
  return withRouter(WithHome);
};
export default withHome;
