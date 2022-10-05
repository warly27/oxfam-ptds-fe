import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./AppUsersTable')));

const AppUsersRoutes = [
  { path: '/appusers/records', element: <Analytics />, auth: authRoles.admin },
];

export default AppUsersRoutes;
