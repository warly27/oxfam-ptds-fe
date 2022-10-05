import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import partnersdRoutes from 'app/views/partners/PartnersRoutes';
import participantsRoutes from 'app/views/participants/ParticipantsRoutes';
import projectsRoutes from 'app/views/projects/ProjectsRoutes';
import appUsersRoutes from 'app/views/appusers/AppUsersRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import activityRoutes from 'app/views/activities/AppActivityRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...chartsRoute,
      ...materialRoutes,
      ...appUsersRoutes,
      ...partnersdRoutes,
      ...participantsRoutes,
      ...projectsRoutes,
      ...activityRoutes,
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
