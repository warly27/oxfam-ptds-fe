import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./ProjectsTable')));

const ProjectsRoutes = [
  { path: '/projects/records', element: <Analytics />, auth: authRoles.admin },
];

export default ProjectsRoutes;
