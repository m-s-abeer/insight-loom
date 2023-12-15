import * as React from "react";
import { Outlet } from "react-router-dom";
import { AppToolbar } from "./AppToolbar";

export default function AppLayout() {
  return (
    <React.Fragment>
      <AppToolbar />
      <React.Suspense>
        <div>
          <Outlet />
        </div>
      </React.Suspense>
    </React.Fragment>
  );
}
