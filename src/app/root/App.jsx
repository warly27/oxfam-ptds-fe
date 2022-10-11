import React from "react";
import { MatxTheme } from "../components";
import { AuthProvider } from "../contexts/JWTAuthContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import Routes from "../routes";

const App = () => {
  return (
    <SettingsProvider>
      <MatxTheme>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </MatxTheme>
    </SettingsProvider>
  );
};

export default App;
