import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCheckSquare, faWalking } from '@fortawesome/free-solid-svg-icons';

import './TagSelect.css';

const faIconMap = {
  list: faList,
  checkSquare: faCheckSquare,
  walking: faWalking
};

export interface TagSelectOption {
  viewValue: string;
  value: string;
  bgColor?: string;
  color?: string;
  icon?: string;
  iconColor?: string;
}

export class TagSelect extends Component<
  {
    options: TagSelectOption[];
    defaultSelectedValue: string;
    selectedBgColor?: string;
    onChange?: (selectedValue: string) => void;
  },
  {
    selectValue: string;
  }
> {
  state = {
    selectValue: null
  };

  componentWillMount() {
    this.setState({
      selectValue: this.props.defaultSelectedValue
    });
  }

  onChange(selectValue: string) {
    this.setState({ selectValue: selectValue });
    if (this.props.onChange) {
      this.props.onChange(selectValue);
    }
  }

  render() {
    const selectedBgColor = this.props.selectedBgColor || '#80d7ff';
    return (
      <div className="tag-select">
        {this.props.options.map((option: TagSelectOption) => {
          return (
            <div
              className="tag-select--item"
              key={option.value}
              style={{
                backgroundColor:
                  this.state.selectValue === option.value ? selectedBgColor : option.bgColor,
                color: option.color
              }}
              onClick={() => {
                this.onChange(option.value);
              }}
            >
              {option.icon && <FontAwesomeIcon icon={faIconMap[option.icon]} />}
              {option.viewValue}
            </div>
          );
        })}
      </div>
    );
  }
}
