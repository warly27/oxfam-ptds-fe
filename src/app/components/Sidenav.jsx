import { styled } from "@mui/system";
import { MatxVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import {
  navigations,
  melsa_navigations,
  partners_navigations,
} from "app/navigations";
import { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import useAuth from "app/hooks/useAuth";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  zIndex: -1,
  [theme.breakpoints.up("lg")]: { display: "none" },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  console.log('user?.role === "admin"', user?.role);

  console.log(
    user?.role === "admin"
      ? navigations
      : "melsa"
      ? melsa_navigations
      : "partner"
      ? partners_navigations
      : null
  );

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav
          items={
            user?.role === "admin"
              ? navigations
              : user?.role === "melsa"
              ? melsa_navigations
              : user?.role === "partner"
              ? partners_navigations
              : []
          }
        />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
};

export default Sidenav;
