import React from 'react';

import './TodoSearcher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTasks } from '@fortawesome/free-solid-svg-icons';

export function TodoSearcher() {
  return (
    <div className="TodoSearcher">
      <FontAwesomeIcon color="#2292A4" icon={faSearch} />
      <input type="text" placeholder="搜索任务" />
    </div>
  );
}
