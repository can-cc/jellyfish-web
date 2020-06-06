import React, { useCallback, useEffect, useState } from 'react';

import './TodoBoxes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faStar, faSun } from '@fortawesome/free-regular-svg-icons';
import { faListAlt, faPlus, faSortAlphaUp, faTasks } from '@fortawesome/free-solid-svg-icons';
import { AppButton } from '../../../../component/AppButton';
import { CreateBoxModal } from '../../CreateBoxModal/CreateBoxModal';
import { useStore } from '../../../../hook/useStore';
import { AppStore } from '../../../../store/store';
import { Box } from '../../../../type/box';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AppAction } from '../../../../store/action';

function BoxItem(props: {
  iconColor: string;
  icon: IconProp;
  name: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <li className={props.selected ? 'selected' : ''} onClick={props.onClick}>
      <FontAwesomeIcon color={props.iconColor} icon={props.icon} />
      <span>{props.name}</span>
    </li>
  );
}

export function TodoBoxes() {
  const [createBoxModalOpen, setCreateBoxModalOpen] = useState(false);
  const boxes = useStore((appStore: AppStore) => appStore.boxes$);

  useEffect(() => {
    AppAction.selectBox('@ALL');
  }, []);

  const selectedBoxId = useStore(appStore => appStore.selectedBoxId$);
  const onBoxClick = useCallback((boxId: string) => {
    AppAction.selectBox(boxId);
  }, []);

  return (
    <div className="TodoBoxes">
      <ul>
        <BoxItem
          iconColor="#556735"
          icon={faSortAlphaUp}
          name="全部"
          selected={selectedBoxId === '@ALL'}
          onClick={() => onBoxClick('@ALL')}
        />
        <BoxItem
          iconColor="#ECC30B"
          icon={faSun}
          name="我的一天"
          selected={selectedBoxId === '@MY_DAILY'}
          onClick={() => onBoxClick('@MY_DAILY')}
        />
        <BoxItem
          iconColor="#FF0000"
          icon={faStar}
          name="重要"
          selected={selectedBoxId === '@IMPORTANT'}
          onClick={() => onBoxClick('@IMPORTANT')}
        />
        <BoxItem
          iconColor="#2292A4"
          icon={faTasks}
          name="任务"
          selected={selectedBoxId === '@TASK'}
          onClick={() => onBoxClick('@TASK')}
        />
        <BoxItem
          iconColor="#9FCC2E"
          icon={faCalendar}
          name="已安排日程"
          selected={selectedBoxId === '@SCHEDULE'}
          onClick={() => onBoxClick('@SCHEDULE')}
        />
      </ul>

      {!!boxes && !!boxes.length && (
        <ul>
          {boxes.map((box: Box) => (
            <BoxItem
              key={box.id}
              iconColor="#2292A4"
              icon={faListAlt}
              name={box.name}
              selected={selectedBoxId === box.id}
              onClick={() => onBoxClick(box.id)}
            />
          ))}
        </ul>
      )}

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
