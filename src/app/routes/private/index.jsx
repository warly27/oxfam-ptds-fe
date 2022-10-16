import React, { Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import privateRoutesList from "./private.routes";

import NotFound from "../../views/sessions/NotFound";

const MatxLayout = lazy(() =>
  import("../../components/MatxLayout/Layout1/Layout1")
);
const DashboardModule = lazy(() => import("../../views/dashboard/Analytics"));

const privateRoutes = [...privateRoutesList];

const PrivateRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<MatxLayout />}>
          <Route index element={<DashboardModule />} />
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
