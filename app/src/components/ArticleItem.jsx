/**
 * Stateless component for singular article item
 */

import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  article: T.object.isRequired,
};

export default class ArticleItem extends Component {
  render() {
    const { article } = this.props;
    if (!article.imgUrl) {
      article.imgUrl = `${process.env.S3_URL}/sale-default.png`;
    }
    return (
      <article className="article">
        <section className="article-brands">
          {article.Brands ? article.Brands.map((brand, key) => {
            if (key === 0 || (key === 1 && article.Brands.length <= 2)) {
              return <p key={key} className="article-brands-brand">{brand.name}</p>
            }
            if (key === 1 && article.Brands.length > 2) {
              return <p key={key} className="article-brands-brand">{brand.name} ...</p>
            }
            return null;
          }) : ''}
        </section>
        <p className="article-date">
          {article.date}
        </p>
        <h1 className="article-title">
          <a href={article.url} target="_blank">{article.title}</a>
        </h1>
        <section className="article-image-container">
          <img className="article-image" src={article.imgUrl} />
        </section>
        <p className="article-blurb">
          {article.blurb}
        </p>
      </article>
    );
  }
}

ArticleItem.propTypes = propTypes;
