import React, { useState } from 'react';
import moment from 'moment';
import { AppButton } from '../../../../component/AppButton';
import { AppAction } from '../../../../store/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './DetailFooter.css';
import { Todo } from '../../../../type/todo';
import { ConfirmModal } from '../../../../component/ConfirmModal';

interface InputProps {
  todo: Todo;
}

export function timeDistance(time: Date, now: Date = new Date()): string {
  const oneDay = 1000 * 60 * 60 * 24;
  const days: number = (now.getTime() - time.getTime()) / oneDay;
  if (days < 1) {
    return '今天';
  }
  if (days < 2) {
    return '昨天';
  }
  if (days < 3) {
    return '前天';
  }
  if (days < 7) {
    return '这周';
  }
  if (days < 8) {
    return '上周';
  }
  return moment(time).format('YYYY年MM月DD号');
}

export function DetailFooter({ todo }: InputProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteTodo = () => {
    AppAction.deleteTodo(todo).then(() => {
      setIsDeleteModalOpen(false);
    });
  };

  return (
    <>
      <div className="DetailFooter">
        <AppButton type="ghost" onClick={() => AppAction.selectTodo(null)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </AppButton>
        <div className="DetailFooter--time">创建于 {timeDistance(todo.createdAt)}</div>

        <AppButton type="ghost" onClick={() => setIsDeleteModalOpen(true)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </AppButton>
      </div>
      <ConfirmModal
        tip={<span>确认要删除吗？</span>}
        isOpen={isDeleteModalOpen}
        confirm={() => deleteTodo()}
        cancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
