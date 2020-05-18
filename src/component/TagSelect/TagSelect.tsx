import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faList, faWalking } from '@fortawesome/free-solid-svg-icons';

import './TagSelect.css';

const faIconMap = {
  list: faList,
  checkSquare: faCheckSquare,
  walking: faWalking
};

export interface TagSelectOption {
  viewValue: string;
  value: any;
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
    selectedColor?: string;
    onChange?: (selectedValue: any) => void;
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
    const selectedBgColor = this.props.selectedBgColor || '#eeeeee';
    const selectedColor = this.props.selectedColor || '#000';
    return (
      <div className="TagSelect">
        {this.props.options.map((option: TagSelectOption) => {
          return (
            <div
              className={`TagSelect--item${
                this.state.selectValue === option.value ? ' selected' : ''
              }`}
              key={option.value}
              style={{
                backgroundColor:
                  this.state.selectValue === option.value ? selectedBgColor : option.bgColor,
                color: this.state.selectValue === option.value ? selectedColor : option.color
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
