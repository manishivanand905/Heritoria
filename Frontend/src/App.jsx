import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import MobileBottomNav from "./components/MobileBottomNav/MobileBottomNav";
import ScrollFloatEffects from "./components/ScrollFloatEffects/ScrollFloatEffects";

import Home from "./pages/User/Home/Home";
import Projects from "./pages/User/Projects/Projects";
import ProjectDetail from "./pages/User/ProjectDetail/Projectdetail";
import ForInvestors from "./pages/User/ForInvestors/Investorspage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <ScrollFloatEffects />
        <div id="page-shell">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Projects} />
            <Route path="/project/:id" component={ProjectDetail} />
            <Route exact path="/forinvestors" component={ForInvestors} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/admin"
              render={() => (
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              )}
            />
          </Switch>
        </div>
        <MobileBottomNav />
      </Router>
    </ThemeProvider>
  );
}

export default App;
