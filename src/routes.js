import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewsList from './components/NewsList';
import News from './components/News';

const ROUTES = [
  {
    path: "/",
    key: "El Tiempo Kids",
    exact: true,
    menu: true,
    component: () => <NewsList />
  },
  {
    path: "/news/:id",
    key: "News",
    exact: false,
    menu: false,
    component: (props) => <News {...props} />
  },
];

export default ROUTES;

/**
 * Renders a router for the application
 */
export class Router extends Component {

  RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }

  render() {
    return (
      <Switch>
        {ROUTES.map((route, i) => {
          return <this.RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    );
  }
}
