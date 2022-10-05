import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./PartnersTable')));

const PartnersRoutes = [
  { path: '/partners/records', element: <Analytics />, auth: authRoles.admin },
];

export default PartnersRoutes;
