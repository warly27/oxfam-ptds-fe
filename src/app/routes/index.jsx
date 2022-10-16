import React, { Suspense } from "react";
import PublicRoutes from "./public";
import PrivateRoutes from "./private";
import useAuth from "../hooks/useAuth";
import Loading from "../components/MatxLoading";

const Routes = () => {
  const { isAuthenticated } = useAuth();

  console.log("[isAuthenticated]: ", isAuthenticated);

  return (
    <Suspense fallback={<Loading />}>
      {!isAuthenticated ? <PublicRoutes /> : <PrivateRoutes />}
    </Suspense>
  );
};

export default Routes;
