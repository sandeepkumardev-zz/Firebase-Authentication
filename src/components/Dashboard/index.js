import React from "react";
import Cards from "./Cards";
import { ActionProvider } from "./context";
import withAuthorization from "../Session/withAuthorization";

function DashboardPage() {
  return (
    <ActionProvider>
      <Cards />
    </ActionProvider>
  );
}

export default withAuthorization(DashboardPage);
