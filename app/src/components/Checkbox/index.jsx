import React, { Component, PropTypes as T } from 'react';

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
    const { info, clickHandler } = this.props;
    const { isChecked } = this.state;
    return (
      <div className="checkbox">
        <input type="checkbox" checked={isChecked} onChange={this.changeHandler} />
        {info}
      </div>
    );
  }
}

Checkbox.propTypes = {
  info: T.string,
  clickHandler: T.func,
};
