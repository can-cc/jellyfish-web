import React, { useState } from 'react';
import { AppButton } from '../../../../component/AppButton';
import { AppDateTimePicker } from '../../../../component/Date/DateTimePicker';
import { Popup } from '../../../../component/Popup/Popup';

export function DetailDateTimePickerPopup({ isOpen, position, onClose, onChange }) {
  const [time, setTime] = useState(null);

  const onConfirm = () => {
    onChange(time);
  };

  return (
    <Popup isOpen={isOpen} position={position} onClose={onClose}>
      <AppDateTimePicker onChange={(value) => setTime(value)} placeholder={'time'} value={time} />
      <AppButton onClick={onConfirm}>ok</AppButton>
    </Popup>
  );
}
