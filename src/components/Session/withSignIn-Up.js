import React from "react";
import { withRouter } from "react-router-dom";
// import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { auth } from "../../firebase";
import AuthUserContext from "./context";

function withSignIn_Up(Component) {
  function WithSignIn_Up(props) {
    React.useEffect(() => {
      const listener = auth.onAuthStateChanged((auth) => {
        if (auth) {
          props.history.push(ROUTES.DASHBOARD);
        }
      });

      return () => {
        listener();
      };
    }, [props]);

    const { authUser } = React.useContext(AuthUserContext);

    return <>{authUser ? null : <Component />}</>;
  }

  return withRouter(WithSignIn_Up);
}

export default withSignIn_Up;
