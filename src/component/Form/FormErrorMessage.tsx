import React, { ReactNode } from 'react';
import { ColorErrorMessage } from '../../constant/Color';

export function FormErrorMessage(props: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        marginTop: 6,
        color: ColorErrorMessage,
        position: 'absolute',
        left: 0,
        bottom: 6
      }}
    >
      {props.children}
    </div>
  );
}
