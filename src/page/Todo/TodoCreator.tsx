import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import message from 'antd/lib/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppAction } from '../../store/action';
import './TodoCreator.css';
import { useStore } from '../../hook/useStore';

export function TodoCreator() {
  const [content, setContent] = useState('');

  const boxId: string = useStore((appStore) => appStore.selectedBoxId$);

  const resetForm = () => {
    setContent('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleReturnPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter') {
      return;
    }

    AppAction.createTodo({
      content,
      boxId,
    })
      .then(() => {
        message.success('添加成功');
        AppAction.getTodos();
        resetForm();
      })
      .catch(() => {
        message.error('添加任务失败，请检查网络');
      });
  };

  return (
    <div className="todo-creator">
      <FontAwesomeIcon icon={faPlus} />
      <input
        placeholder="添加任务"
        value={content}
        onChange={handleChange}
        onKeyPress={handleReturnPress}
      />
    </div>
  );
}
