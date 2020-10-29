import React, { Component } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../../type/todo';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AppAction } from '../../store/action';

import './TodoList.css';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({});

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

class TodoCollection extends Component<{
  todos: Todo[];
  selectedTodoID?: string;
  onSort: Function;
}> {
  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.props.onSort}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          selected={todo.id === this.props.selectedTodoID}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export class TodoList extends Component<
  {
    todos: Todo[];
    selectedTodoID?: string;
    boxId: string;
  }
> {

  onReSort = (result) => {
    // https://codesandbox.io/s/k260nyxq9v?file=/index.js
    if (!result.destination) {
      return;
    }
    const todoId = this.props.todos[result.source.index].id;
    const targetTodoId = this.props.todos[result.destination.index].id;
    const isBefore = result.source.index > result.destination.index
    AppAction.sortTodo({
      boxId: this.props.boxId,
      todoId,
      targetTodoId,
      isBefore
    });
    // const items = reorder(this.state.items, result.source.index, result.destination.index);
    // this.setState({
    //   items
    // });
  }

  sort(todos: Todo[]) {
    return todos.sort((a, b) => a.order - b.order);
  }

  render() {
    return (
      <div className="todo-list-container">
        <TodoCollection 
          todos={this.sort(this.props.todos)} 
          selectedTodoID={this.props.selectedTodoID}
          onSort={this.onReSort} />
      </div>
    );
  }
}
