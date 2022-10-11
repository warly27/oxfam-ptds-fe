import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import publicRoutesList from "./public.routes";
import NotFound from "../../views/sessions/NotFound";

const publicRoutes = [...publicRoutesList];

const PublicRoutes = () => {
  return (
    <Fragment>
      <Routes>
        {publicRoutes.map((r) => {
          return (
            <Route
              key={r.id}
              exact={r.exact}
              element={r.component}
              path={r.path}
            />
          );
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default PublicRoutes;
