import React, { PropTypes as T } from 'react';

export default function Article({ article }) {
  return (
    <div>
      <h1 className="title">{article.title}</h1>
      <p className="date">{article.date}</p>
      <p className="blurb">{article.blurb}</p>
      <a href={article.url} target="_blank">Click here to check out the article</a>
    </div>
  );
}

Article.propTypes = {
  article: T.object,
};
