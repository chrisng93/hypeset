import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  info: T.string.isRequired,
  clickHandler: T.func.isRequired,
};

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler() {
    const { info, clickHandler } = this.props;
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
    clickHandler(info, isChecked)
  }

  render() {
    const { info } = this.props;
    const { isChecked } = this.state;
    return (
      <section className="checkbox">
        <input type="checkbox" checked={isChecked} onChange={this.changeHandler} />
        <span className="info">{info}</span>
      </section>
    );
  }
}

Checkbox.propTypes = propTypes;
