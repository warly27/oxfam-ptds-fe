import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./AppActivityTable')));

const AppActivityRoutes = [
  { path: '/activity/records', element: <Analytics />, auth: authRoles.admin },
];

export default AppActivityRoutes;
