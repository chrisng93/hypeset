import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  article: T.object.isRequired,
};

export default class ArticleItem extends Component {
  render() {
    const { article } = this.props;
    if (!article.imgUrl) {
      article.imgUrl = 'https://s3-us-west-1.amazonaws.com/hypeset/sale-default.png';
    }
    return (
      <article className="article">
        <section className="article-brands">
          {article.Brands ? article.Brands.map((brand, key) => <p key={key} className="article-brands-brand">{brand.name}</p>) : ''}
        </section>
        <p className="article-date">{article.date}</p>
        <h1 className="article-title"><a href={article.url} target="_blank">{article.title}</a></h1>
        <section className="article-image-container">
          <img className="article-image" src={article.imgUrl} />
        </section>
        <p className="article-blurb">{article.blurb}</p>
      </article>
    );
  }
}

ArticleItem.propTypes = propTypes;
