import React from 'react';
import { AppDateTimePicker } from '../../../../component/Date/DateTimePicker';
import { Popup } from '../../../../component/Popup/Popup';

export function DetailDateTimePickerPopup({
    isOpen,
    position,
    onClose
}) {
    return <Popup isOpen={isOpen} position={position} onClose={onClose} >
        <AppDateTimePicker 
          onChange={() => {}}
          placeholder={'time'}
          value={null}  />
    </Popup>
}