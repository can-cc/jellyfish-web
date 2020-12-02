import React from 'react';
import moment from 'moment';

const statusStyleMap = {
  normal: {
    color: '#333',
    backgroundColor: '#c1ffc1'
  },
  delay: {
    color: 'white',
    backgroundColor: '#f50'
  }
};

export function DeadlineTag({ deadline }) {
  const isAfter = moment(deadline).isAfter(moment(new Date()));
  const status = isAfter ? 'normal' : 'delay';

  return (
    <div
      title="截止日期"
      style={{
        marginLeft: 10,
        padding: '1px 8px',
        borderRadius: 3,
        ...statusStyleMap[status]
      }}
    >
      {moment(deadline).format('YYYY-MM-DD')}
    </div>
  );
}
