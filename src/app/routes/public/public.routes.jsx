import { lazy } from "react";
const LoginModule = lazy(() => import("../../views/sessions/JwtLogin"));
const ForgotPasswordModule = lazy(() =>
  import("../../views/sessions/ForgotPassword")
);

const LogoutModule = lazy(() => import("../../views/sessions/Logout"));

const publicRoutes = [
  {
    id: "loginModule",
    path: "/",
    component: <LoginModule />,
    exact: true,
  },
  {
    id: "loginModule",
    path: "/login",
    component: <LoginModule />,
    exact: true,
  },
  {
    id: "forgotPassword",
    path: "/forgot-password",
    component: <ForgotPasswordModule />,
    exact: true,
  },
  {
    id: "logoutModule",
    path: "/logout",
    component: <LogoutModule />,
    exact: true,
  },
];

export default publicRoutes;
