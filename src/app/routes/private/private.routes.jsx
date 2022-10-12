import { lazy } from "react";

const DashboardModule = lazy(() => import("../../views/dashboard/Analytics"));
const AppUserModule = lazy(() => import("../../views/appusers/AppUsersTable"));
const Partners = lazy(() => import("../../views/partners/PartnersTable"));
const ProjectsModule = lazy(() => import("../../views/projects/ProjectsTable"));

const privateRoutes = [
  {
    id: "dashboardModule",
    path: "dashboard",
    children: <DashboardModule />,
    exact: true,
  },
  {
    id: "appUserModule",
    path: "appusers/records",
    children: <AppUserModule />,
    exact: true,
  },
  {
    id: "partnerModule",
    path: "partners/records",
    children: <Partners />,
    exact: true,
  },
  {
    id: "projectsModule",
    path: "projects/records",
    children: <ProjectsModule />,
    exact: true,
  },
];

export default privateRoutes;
