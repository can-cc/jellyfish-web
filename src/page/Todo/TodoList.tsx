import React, { Component } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../../type/todo';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
}> {
  onDragEnd(result) {
    // https://codesandbox.io/s/k260nyxq9v?file=/index.js
    if (!result.destination) {
      return;
    }
    // const items = reorder(this.state.items, result.source.index, result.destination.index);
    // this.setState({
    //   items
    // });
  }

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
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
  },
  {}
> {
  render() {
    return (
      <div className="todo-list-container">
        <TodoCollection todos={this.props.todos} selectedTodoID={this.props.selectedTodoID} />
      </div>
    );
  }
}
