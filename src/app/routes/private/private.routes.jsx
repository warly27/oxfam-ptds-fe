import { lazy } from "react";

const DashboardModule = lazy(() => import("../../views/dashboard/Analytics"));
const AppUserModule = lazy(() => import("../../views/appusers/AppUsersTable"));
const Partners = lazy(() => import("../../views/partners/PartnersTable"));
const ProjectsModule = lazy(() => import("../../views/projects/ProjectsTable"));
const ParticipantsModule = lazy(() =>
  import("../../views/participants/ParticipantsTable")
);
const PartnersCodeModule = lazy(() => import("../../views/codes/partner/PartnerCodeTable"));
const ProjectsCodeModule = lazy(() => import("../../views/codes/project/ProjectCodeTable"));
const IndicatorsCodeModule = lazy(() => import("../../views/codes/indicator/IndicatorCodeTable"));

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
  {
    id: "participantsModule",
    path: "participants/records",
    children: <ParticipantsModule />,
    exact: true,
  },
  {
    id: "partnersCodeModule",
    path: "partners/code",
    children: <PartnersCodeModule />,
    exact: true,
  },
  {
    id: "projectsCodeModule",
    path: "projects/code",
    children: <ProjectsCodeModule />,
    exact: true,
  },
  {
    id: "indicatorsCodeModule",
    path: "indicators/code",
    children: <IndicatorsCodeModule />,
    exact: true,
  },
];

export default privateRoutes;
