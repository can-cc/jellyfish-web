import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './ModalHeader.css';

export class ModalHeader extends Component<{
  title: string;
  closeable?: boolean;
  onClose?: () => void;
}> {
  onClose = (): void => {
    if (!this.props.onClose) {
      return;
    }
    this.props.onClose();
  };

  render() {
    return (
      <div className="modal-header">
        <div className="modal-header--title">{this.props.title}</div>

        {this.props.closeable ? (
          <div className="modal-header--close" onClick={this.onClose}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        ) : null}
      </div>
    );
  }
}
