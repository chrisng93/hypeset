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
        <p className="article-info-container-brands">{brandNames.length > 1 ? 'Brands' : 'Brand'}: {brandNames.join(', ')}</p>
      );
    }
    return null;
  }

  render() {
    const { article } = this.props;
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
          {this.renderBrandTag()}
        </section>
      </article>
    );
  }
}

ArticleItem.propTypes = propTypes;
