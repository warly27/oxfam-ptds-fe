import React, { Suspense } from "react";
import PublicRoutes from "./public";
import PrivateRoutes from "./private";
import useAuth from "../hooks/useAuth";
import Loading from "../components/MatxLoading";

const Routes = () => {
  const { isAuthenticated, user } = useAuth();

  console.log("[isAuthenticated]: ", isAuthenticated);

  return (
    <Suspense fallback={<Loading />}>
      {!isAuthenticated ? <PublicRoutes /> : <PrivateRoutes user={user} />}
    </Suspense>
  );
};

export default Routes;
