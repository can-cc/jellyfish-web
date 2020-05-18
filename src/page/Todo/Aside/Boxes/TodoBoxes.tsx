import React, { useCallback, useState } from 'react';

import './TodoBoxes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faStar, faSun } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTasks } from '@fortawesome/free-solid-svg-icons';
import { AppButton } from '../../../../component/AppButton';
import { CreateBoxModal } from '../../CreateBoxModal/CreateBoxModal';

export function TodoBoxes() {
  const [createBoxModalOpen, setCreateBoxModalOpen] = useState(false);

  return (
    <div className="TodoBoxes">
      <ul>
        <li>
          <FontAwesomeIcon color="#ECC30B" icon={faSun} />
          <span>我的一天</span>
        </li>
        <li>
          <FontAwesomeIcon color="#FF0000" icon={faStar} />
          <span>重要</span>
        </li>
        <li className="selected">
          <FontAwesomeIcon color="#2292A4" icon={faTasks} />
          <span>任务</span>
        </li>
        <li>
          <FontAwesomeIcon color="#9FCC2E" icon={faCalendar} />
          <span>已安排日程</span>
        </li>
      </ul>

      <div className="divider" />

      <div className="add-todo-list">
        <AppButton
          bgColor={'transparent'}
          onClick={useCallback(() => setCreateBoxModalOpen(true), [])}
        >
          <FontAwesomeIcon color="#fff" icon={faPlus} />
          <span>新建清单</span>
        </AppButton>
      </div>

      <CreateBoxModal
        isOpen={createBoxModalOpen}
        onClose={useCallback(() => setCreateBoxModalOpen(false), [])}
      />
    </div>
  );
}
