import React, { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TextSecondaryColor } from '../../constant/Color';

interface InputProps {
  name?: string;
  icon?: IconProp;
  children: ReactNode;
  type?: 'inline';
  className?: string;
  require?: boolean;
}

export function FormField({
  name,
  icon,
  children,
  className = '',
  type,
  require = false,
}: InputProps) {
  return (
    <div
      className={`FormField ${className}`}
      style={{
        verticalAlign: 'center',
        position: 'relative',
        paddingBottom: 26,
      }}
    >
      {name && (
        <span
          className={`FormField--name`}
          style={{
            marginRight: 12,
            color: TextSecondaryColor,
            display: type === 'inline' ? 'inline-block' : 'block',
            marginBottom: 2,
          }}
        >
          {name}
          {require && <span className="FormField-flag">*</span>}
        </span>
      )}
      <>{children}</>
    </div>
  );
}
