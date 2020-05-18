import React, { Component } from 'react';

import './AppButton.css';

export type ButtonType = 'primary' | 'link';

export type ButtonSize = 'lg' | 'md';

export class AppButton extends Component<{
  title?: string;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  htmlType?: 'submit' | 'button';
  onClick?: () => void;
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
    return [this.props.className, this.props.type, this.props.size || 'md', 'app-button']
      .filter(v => !!v)
      .join(' ');
  }

  render() {
    return (
      <button
        style={{
          background: this.props.bgColor
        }}
        type={this.props.htmlType}
        className={this.buildClassName()}
        onClick={this.onClick}
      >
        {this.props.title ? this.props.title : this.props.children}
      </button>
    );
  }
}
