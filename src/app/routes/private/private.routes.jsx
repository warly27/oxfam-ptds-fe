import { lazy } from "react";

const DashboardModule = lazy(() => import("../../views/dashboard/Analytics"));
const Analytics = lazy(() => import("../../views/appusers/AppUsersTable"));
const Partners = lazy(() => import("../../views/partners/PartnersTable"));

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
    children: <Analytics />,
    exact: true,
  },
  {
    id: "partnerModule",
    path: "partners/records",
    children: <Partners />,
    exact: true,
  },
];

export default privateRoutes;
