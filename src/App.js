import React, { Component } from 'react';
import Menu from "./components/Menu";
import { Router } from "./routes";
import styles from "./styles/app.module.css";

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Menu {...this.props} />
        <Router />
      </div>
    );
  }
}

export default App;
