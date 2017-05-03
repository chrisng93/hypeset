/**
 * Stateless component for singular article item
 */

import React, { PropTypes as T } from 'react';

const propTypes = {
  article: T.object.isRequired,

  routeToBrandPage: T.func,
};

const condenseAll = string => string.replace(/[^a-z0-9]/gi, '').toLowerCase();

export default function ArticleItem({ article, routeToBrandPage }) {
  if (!article.imgUrl) {
    article.imgUrl = `${process.env.S3_URL}/sale-default.png`;
  }
  return (
    <article className="article">
      <section className="article-brands">
        {article.Brands ? article.Brands.map((brand, key) => {
          if (key === 0 || (key === 1 && article.Brands.length <= 2)) {
            return (
              <p
                key={key}
                className="article-brands-brand"
                onClick={routeToBrandPage ? () => routeToBrandPage(condenseAll(brand.name)) : null}
              >
                {brand.name}
              </p>
            )
          }
          if (key === 1 && article.Brands.length > 2) {
            return (
              <p
                key={key}
                className="article-brands-brand"
                onClick={routeToBrandPage ? () => routeToBrandPage(condenseAll(brand.name)) : null}
              >
                {brand.name}
              </p>
            )
          }
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

ArticleItem.propTypes = propTypes;
