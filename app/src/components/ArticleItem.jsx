import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  article: T.object.isRequired,
};

export default class ArticleItem extends Component {
  render() {
    const { article } = this.props;
    if (!article.imgUrl) {
      article.imgUrl = require('../../assets/sale_default.png');
    }
    return (
      <article className="article">
        <p className="article-brands">{article.Brands ? article.Brands.map(brand => brand.name).join(', ') : ''}</p>
        <p className="article-date">{article.date}</p>
        <h1 className="article-title"><a href={article.url} target="_blank">{article.title}</a></h1>
        <img className="article-image" src={article.imgUrl} />
        <p className="article-blurb">{article.blurb}</p>
      </article>
    );
  }
}

ArticleItem.propTypes = propTypes;
