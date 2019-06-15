import React, { Component } from 'react';

import './Checkbox.css';

export class Checkbox extends Component<{
  defaultChecked: boolean;
  onChange: (checked: boolean) => void;
}> {
  render() {
    return (
      <label className="app-rounded-checkbox app-checkbox">
        <input type="checkbox" value="None" defaultChecked={this.props.defaultChecked} />
        <span className="label" />
      </label>
    );
  }
}
