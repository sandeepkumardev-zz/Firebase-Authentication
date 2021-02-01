import React from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useAuth } from "../../firebase/context";

function withSignIn_Up(Component) {
  function WithSignIn_Up() {
    const history = useHistory();
    const { currentUser } = useAuth();

    if (currentUser) {
      history.push(ROUTES.DASHBOARD);
    }

    return <>{currentUser ? null : <Component />}</>;
  }

  return WithSignIn_Up;
}

export default withSignIn_Up;
