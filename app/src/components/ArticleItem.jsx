import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  article: T.object.isRequired,
};

export default class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandNames: [],
      renderBrandTag: false,
    };
    this.setBrands = this.setBrands.bind(this);
    this.renderBrandTag = this.renderBrandTag.bind(this);
  }

  componentWillMount() {
    this.setBrands();
  }

  componentWillReceiveProps() {
    this.setBrands();
  }

  setBrands() {
    const { article } = this.props;
    if (article.Brands) {
      this.setState({
        brandNames: article.Brands.map(brand => brand.name),
        renderBrandTag: true,
      });
    }
  }

  renderBrandTag() {
    const { brandNames, renderBrandTag } = this.state;
    if (renderBrandTag) {
      return (
        <p className="article-brands">{brandNames.join(', ')}</p>
      );
    }
    return null;
  }

  render() {
    const { article } = this.props;
    if (!article.imgUrl) {
      article.imgUrl = require('../../assets/sale_default.png');
    }
    return (
      <article className="article">
        {this.renderBrandTag()}
        <p className="article-date">{article.date}</p>
        <h1 className="article-title"><a href={article.url} target="_blank">{article.title}</a></h1>
        <img className="article-image" src={article.imgUrl} />
        <p className="article-blurb">{article.blurb}</p>
      </article>
    );
  }
}

ArticleItem.propTypes = propTypes;
