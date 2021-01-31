import React from "react";
import { withAuthorization } from "../Session";

function DashboardPage() {
  return <div>Bookmark Application</div>;
}

export default withAuthorization(DashboardPage);
