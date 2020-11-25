import React, { ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DetailField.css';

interface InputProps {
  name: string;
  icon: IconDefinition;
  placeholder: string;
  children?: ReactNode;
}


export const DetailField = React.forwardRef<HTMLDivElement, InputProps>(
  ({icon, name, placeholder, children }: InputProps,
  ref
  ) => {
    return (
      <div ref={ref} className="DetailField">
        <FontAwesomeIcon icon={icon} />
        {children || <span>{placeholder}</span>}
      </div>
    );
  }) 


