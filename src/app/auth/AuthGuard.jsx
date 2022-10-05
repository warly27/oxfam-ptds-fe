import useAuth from 'app/hooks/useAuth';
import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
import AllPages from '../routes';

const userHasPermission = (pathname, user, routes) => {
  if (!user) {
    return false;
  }
  console.log(user.role);
  console.log(JSON.stringify(user) + ' USER');
  console.log(pathname + ' PATH NAME');
  console.log(JSON.stringify(routes) + ' Routes');

  const matched = routes.find((r) => r.path === pathname);
  console.log(matched + ' Matched');
  console.log(matched.auth + ' Auth Match');

  const authenticated =
    matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
  return authenticated;
};

const AuthGuard = ({ children }) => {
  let { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();

  const routes = flat(AllPages);

  console.log(routes + ' ROUTES');
  console.log(userHasPermission + ' User Permission');
  const hasPermission = userHasPermission(pathname, user, routes);
  //   let authenticated = isAuthenticated && hasPermission;
  console.log(hasPermission + ' Permission');
  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  let authenticated = isAuthenticated;
  console.log(authenticated + ' Is Authenticated');

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
