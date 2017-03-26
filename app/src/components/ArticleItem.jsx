import React, { PropTypes as T } from 'react';

const propTypes = {
  article: T.object.isRequired,
};

export default function ArticleItem({ article }) {
  const brandNames = article.Brands.map(brand => brand.name);
  return (
    <article className="article">
      <section className="article-image-container">
        <img src={article.imgUrl} />
      </section>
      <section className="article-info-container">
        <header>
          <a href={article.url} target="_blank">{article.title}</a>
        </header>
        <p className="article-info-container-date">{article.date}</p>
        <p className="article-info-container-blurb">{article.blurb}</p>
        <p className="article-info-container-brands">{brandNames.length > 1 ? 'Brands' : 'Brand'}: {brandNames.join(', ')}</p>
      </section>
    </article>
  );
}

ArticleItem.propTypes = propTypes;
