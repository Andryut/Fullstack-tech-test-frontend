import base64 from 'base-64';
import backendConfig from './config/backendConfig';

/**
 * Helper function to build the http request to the backend server
 */
function buildReqOptions() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'Basic ' + base64.encode(backendConfig.username + ":" + backendConfig.password));
  headers.append('X-CSRF-Token', 'Z-J1_ZDOHXEpPfc6Fjx55DzrO0o--CcBCkvBcNIdk68');
  headers.append('Origin', 'http://localhost:3000');
  return { headers: headers };
}

/**
 * Request list of news to the backend server
 * @param {Component} component used to set the state
 */
export function getNewsList(component) {
  component.setState({ loading: true });
  fetch(backendConfig.baseUrl + '/rest/news?page=' + component.state.page, buildReqOptions())
    .then(res => res.json())
    .then((data) => {
      component.setState({ news: [...component.state.news, ...data] });
      component.setState({ loading: false });
      component.setState({ page: component.state.page + 1 });
    }).catch((error) => { });
}

/**
 * Request a specific new to the backend server
 * @param {string} id of the new to be fetched 
 * @param {Component} component used to set the state
 */
export function getNews(id, component) {
  fetch(backendConfig.baseUrl + '/rest/news/' + id, buildReqOptions())
    .then(res => res.json())
    .then((data) => { component.setState(data.values().next().value) })
    .catch((error) => { });
}