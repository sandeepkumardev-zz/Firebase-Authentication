import React from "react";
import { withRouter } from "react-router-dom";
// import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { auth } from "../../firebase";
import AuthUserContext from "./context";

function withAuthorization(Component) {
  function WithAuthorization(props) {
    React.useEffect(() => {
      const listener = auth.onAuthStateChanged((auth) => {
        if (!auth) {
          props.history.push(ROUTES.LANDING);
        }
      });

      return () => {
        listener();
      };
    }, [props]);

    const { authUser } = React.useContext(AuthUserContext);

    return <>{authUser ? <Component /> : null}</>;
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
