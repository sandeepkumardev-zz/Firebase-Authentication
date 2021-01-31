import React from "react";
import { AuthUserContext } from ".";
import { auth } from "../../firebase";

function withAuthentication(Component) {
  function WithAuthentication() {
    const [authUser, setAuthUser] = React.useState(null);

    React.useEffect(() => {
      const listener = auth.onAuthStateChanged((user) => {
        user ? setAuthUser(user) : setAuthUser(null);
      });

      return () => {
        listener();
      };
    }, []);

    return (
      <AuthUserContext.Provider value={{ authUser }}>
        <Component />
      </AuthUserContext.Provider>
    );
  }
  return WithAuthentication;
}

export default withAuthentication;
