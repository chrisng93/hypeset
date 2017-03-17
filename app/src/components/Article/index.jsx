import React, { PropTypes as T } from 'react';

export default function Article({ article }) {
  return (
    <div className="article">
      <div className="image-container">
        <img src={article.imgUrl} />
      </div>
      <div className="info-container">
        <div className="title-container">
          <h1 className="title">{article.title}</h1>
          <p className="date">{article.date}</p>
        </div>
        <div className="body-container">
          <p className="blurb">{article.blurb}</p>
          <a href={article.url} target="_blank">Click here to check out the article</a>
        </div>
      </div>
    </div>
  );
}

Article.propTypes = {
  article: T.object,
};
