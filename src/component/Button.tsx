import React, { Component } from 'react';

import './Button.css';

export type ButtonType = 'primary';

export class Button extends Component<{
  title: string;
  type?: ButtonType;
  onClick: () => void;
  className?: string;
}> {
  onClick = (): void => {
    if (!this.props.onClick) {
      return;
    }
    this.props.onClick();
  };

  buildClassName(): string {
    return [this.props.className, this.props.type, 'app-button'].filter(v => !!v).join(' ');
  }

  render() {
    return (
      <button className={this.buildClassName()} onClick={this.onClick}>
        {this.props.title}
      </button>
    );
  }
}
