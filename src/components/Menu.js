import React, { Component } from 'react';
import ROUTES from "../routes";
import { Route } from "react-router-dom";
import styles from "../styles/menu.module.css";

/**
 * Renders a menu element
 */
class MenuElement extends Component {
  /**
   * Callback to render a new path for the desired menu element
   * @param {string} path path to be rendered
   */
  renderRoute(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className={styles.menu} onClick={() => this.renderRoute(this.props.path)}>
        <div className="cardBody">
          <h1 className={styles.cardTitle}>{this.props.route_key}</h1>
        </div>
      </div>
    );
  }
}

/**
 * Renders a menu with the capability of use sub-menus
 */
class Menu extends Component {
  render() {
    return (
      <div className={styles.menu}>
        {ROUTES.filter((route) => {
          return route.menu;
        }).map(route => {
          if (route.routes) {
            return (
              <React.Fragment key={route.key}>
                <Route render={props => <MenuElement {...route} route_key={route.key} {...props} />} />
                {Menu(route.routes)}
              </React.Fragment>
            );
          }
          return (
            <Route key={route.key}
              render={props => <MenuElement {...route} route_key={route.key} {...props} />}
            />
          )
        })}
      </div>
    );
  }
}

export default Menu;