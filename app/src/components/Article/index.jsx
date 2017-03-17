import React, { PropTypes as T } from 'react';

export default function Article({ article }) {
  return (
    <div className="article">
      <div className="image-container">
        <img src={article.imgUrl} />
      </div>
      <div className="info-container">
        <div className="title">
          <a href={article.url} target="_blank">{article.title}</a>
        </div>
        <div className="date">{article.date}</div>
        <div className="blurb">{article.blurb}</div>
      </div>
    </div>
  );
}

Article.propTypes = {
  article: T.object,
};
