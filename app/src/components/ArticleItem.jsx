import React, { PropTypes as T } from 'react';

const propTypes = {
  article: T.object.isRequired,
};

export default function ArticleItem({ article }) {
  return (
    <article className="article">
      <section className="image-container">
        <img src={article.imgUrl} />
      </section>
      <section className="info-container">
        <header>
          <a href={article.url} target="_blank">{article.title}</a>
        </header>
        <p className="date">{article.date}</p>
        <p className="blurb">{article.blurb}</p>
      </section>
    </article>
  );
}

ArticleItem.propTypes = propTypes;
