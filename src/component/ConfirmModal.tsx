import React, { ReactNode } from 'react';
import { AppModal } from './Modal';
import { AppButton } from './AppButton';

interface Props {
  tip: ReactNode;
  isOpen: boolean;
  confirm: any;
  cancel: any;
}

export function ConfirmModal({ tip, isOpen, confirm, cancel }: Props) {
  return (
    <AppModal
      style={{
        content: {
          width: 220,
          minWidth: 220,
          height: 'auto',
          top: '40%',
          bottom: 'auto',
          left: '50%',
          marginLeft: -110,
          textAlign: 'center',
        },
      }}
      isOpen={isOpen}
    >
      <div>{tip}</div>
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <AppButton onClick={cancel}>取消</AppButton>
        <AppButton type="error" onClick={confirm}>
          确认
        </AppButton>
      </div>
    </AppModal>
  );
}
