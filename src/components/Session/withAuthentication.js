import React from "react";
import { AuthUserContext } from ".";
import { auth } from "../../firebase";
import { Data } from "../../firebase/context";

function withAuthentication(Component) {
  function WithAuthentication() {
    const [authUser, setAuthUser] = React.useState(null);

    const { updateUser } = React.useContext(Data);

    React.useEffect(() => {
      const listener = auth.onAuthStateChanged((user) => {
        if (user?.displayName) {
          console.log("object");
          updateUser({
            name: user.displayName,
            photoURL: user.photoURL,
          });
        }
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
