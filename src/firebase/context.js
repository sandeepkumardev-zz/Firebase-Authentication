import React from "react";
import { auth } from "./firebase";

export const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [userInfo, setUser] = React.useState(null);

  const updateUser = (logs) => {
    setUser(logs);
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user?.displayName) {
        updateUser({ name: user.displayName, photoURL: user.photoURL });
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userInfo, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
