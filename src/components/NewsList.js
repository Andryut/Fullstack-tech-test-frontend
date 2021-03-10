import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { getNewsList } from '../backendService';
import styles from "../styles/newslist.module.css";

/**
 * Renders a list of news fetched from the backend service
 */
class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  };

  /**
   * Callback to render news when the end of the rendered list is reached
   * @param {array} entities
   * @param {observer} object
   */
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      getNewsList(this);
    }
    this.setState({ prevY: y });
  }

  componentDidMount() {
    getNewsList(this);

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  /**
   * Callback to redirect news
   * @param {string} id news nid that maps the news id on the backend service
   */
  renderNews(id) {
    let path = '/news/' + id;
    this.props.history.push(path);
  }

  render() {
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="container">
        <div className={styles.scrollableList}>
          {this.state.news.map((element) => (
            <div className="card" style={{ padding: "1em" }} >
              <div className={styles.cardBody} key={element.nid} onClick={() => this.renderNews(element.nid)}>
                <div className="cardImage">
                  <img src={element.summary_image} alt="Summary headline" />
                </div>
                <div className="cardNews">
                  <h5 className="cardTitle">{element.title}</h5>
                  <p className="cardSummary">{element.summary}</p>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.loading} ref={loadingRef => (this.loadingRef = loadingRef)}>
            <span style={loadingTextCSS}>Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewsList);