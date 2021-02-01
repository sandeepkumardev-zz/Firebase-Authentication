import React from "react";


function DashboardPage() {
  return (
    <div>
      Dashboard
    </div>
  );
}

export default withAuthorization(DashboardPage);
