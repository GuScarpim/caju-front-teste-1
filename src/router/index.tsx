import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import routes from "./routes";

const DashboardPage = lazy(() => import("../pages/Dashboard"));
const NewUserPage = lazy(() => import("../pages/NewUser"));

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <HashRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Switch>
            <Route exact path={routes.dashboard} component={DashboardPage} />
            <Route exact path={routes.newUser} component={NewUserPage} />

            <Route exact path="*">
              <Redirect to={routes.dashboard} />
            </Route>
          </Switch>
        </Suspense>
      </HashRouter>
    </div>
  );
};

export default Router;
