import React, { Component, PropTypes as T } from 'react';
import Article from '../Article';

export default class News extends Component {
  componentWillMount() {
    const { token, getNews } = this.props;
    getNews({ token });
  }

  render() {
    return (
      <div className="news">
        {this.props.news.map((news, key) => <Article article={news} key={key} /> )}
      </div>
    );
  }
}

News.propTypes = {
  getNews: T.func,
  token: T.string,
  news: T.array,
};
