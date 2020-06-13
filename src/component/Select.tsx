import React, { ChangeEvent, CSSProperties } from 'react';

interface Option {
  label: string;
  value: any;
}

interface Props {
  options: Option[];
  value: any;
  placeholder: string;
  style?: CSSProperties;
  onChange: (value: any) => void;
}

export function Select({ options, value, placeholder, onChange, style }: Props) {
  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <select
      className={'AppSelect'}
      value={value}
      onChange={onSelectChange}
      style={{
        border: 'none',
        outline: 'none',
        background: 'transparent',
        lineHeight: 1.8,
        ...style
      }}
    >
      <option value={''}>{placeholder}</option>
      {options.map(option => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}
