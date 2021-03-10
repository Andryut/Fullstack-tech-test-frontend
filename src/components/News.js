import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getNews } from '../backendService';

/**
 * Renders a new fetched from the backend service
 */
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {
    getNews(this.props.match.params.id, this);
  }

  render() {
    return (
      <div className="container">
        <div className="cardBody">
          <h3 className="cardTitle">{this.state.title}</h3>
        </div>
        <div className="cardContent"> {ReactHtmlParser(this.state.body)} </div>
      </div>
    );
  }
}

export default News;