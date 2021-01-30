import React from "react";
import { signOut, useData } from "../../firebase";
import { withHome } from "../Session";

function DashboardPage() {
  const { dispatch } = useData();
  return (
    <div>
      Bookmark Application
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default withHome(DashboardPage);
