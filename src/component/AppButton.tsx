import React, { Component } from 'react';

import './Button.css';

export type ButtonType = 'primary';

export class AppButton extends Component<{
  title?: string;
  type?: ButtonType;
  onClick: () => void;
  bgColor?: string;
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
      <button style={{
        background: this.props.bgColor
      }} className={this.buildClassName()} onClick={this.onClick}>
        {this.props.title ? this.props.title : this.props.children}
      </button>
    );
  }
}
