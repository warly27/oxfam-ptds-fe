import React, { Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import privateRoutesList from "./private.routes";

import NotFound from "../../views/sessions/NotFound";

const MatxLayout = lazy(() =>
  import("../../components/MatxLayout/Layout1/Layout1")
);
const DashboardModule = lazy(() => import("../../views/dashboard/Analytics"));

const ProjectsModule = lazy(() => import("../../views/projects/ProjectsTable"));

const privateRoutes = [...privateRoutesList];

const PrivateRoutes = ({ user }) => {
  console.log("[user]: ", user);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<MatxLayout />}>
          {user?.role === "partner" ? (
            <Route index element={<ProjectsModule />} />
          ) : (
            <Route index element={<DashboardModule />} />
          )}
          {privateRoutes.map((r) => {
            return (
              <Route
                key={r.id}
                exact={r.exact}
                element={r.children}
                path={r.path}
              />
            );
          })}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default PrivateRoutes;
