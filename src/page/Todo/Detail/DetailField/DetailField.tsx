import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DetailField.css';

interface InputProps {
  name: string;
  icon: IconDefinition;
  placeholder: string;
}

export function DetailField({ icon, name, placeholder }: InputProps) {
  return (
    <div className="DetailField">
      <FontAwesomeIcon icon={icon} />
      <span>{placeholder}</span>
    </div>
  );
}
