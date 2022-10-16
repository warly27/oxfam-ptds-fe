import useAuth from "app/hooks/useAuth";
import { flat } from "app/utils/utils";
import { Navigate, useLocation } from "react-router-dom";
import AllPages from "../routes";

const userHasPermission = (pathname, user, routes) => {
  console.log("[user]", user);
  if (!user) {
    return false;
  }

  console.log(user.role);
  console.log(JSON.stringify(user) + " USER");
  console.log(pathname + " PATH NAME");
  console.log(JSON.stringify(routes) + " Routes");

  const matched = routes.find((r) => r.path === pathname);
  console.log(matched + " Matched");
  console.log(matched.auth + " Auth Match");

  const authenticated =
    matched && matched.auth && matched.auth.length
      ? matched.auth.includes(user.role)
      : true;
  return authenticated;
};

const AuthGuard = ({ children }) => {
  let { isAuthenticated, user } = useAuth();
  console.log("[isAuthenticated]", isAuthenticated);
  console.log("[user]", user);

  const { pathname } = useLocation();

  const routes = flat(AllPages);

  console.log(routes + " ROUTES");

  const hasPermission = userHasPermission(pathname, user, routes);
  console.log("User Permission", hasPermission);
  //   let authenticated = isAuthenticated && hasPermission;
  console.log(hasPermission + " Permission");
  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  let authenticated = isAuthenticated;
  console.log("Is Authenticated", authenticated);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  return <>{(authenticated || isLoggedIn === "true") && children}</>;
};

export default AuthGuard;
