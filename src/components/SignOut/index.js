import React from "react";
import { signOut } from "../../firebase";

function SignOut() {
  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
}

export default SignOut;
