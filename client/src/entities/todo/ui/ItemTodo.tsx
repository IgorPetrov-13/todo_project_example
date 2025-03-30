import React, { memo, useState } from 'react';
import type { TypeTodo, TypeTodoId, TypeTodoUserId } from '../types/todoTypes';
import UpdateForm from './UpdateForm';

type PropsType = {
  todo: TypeTodo;
  updateTodoHandler: (todoId: TypeTodoId, userId: TypeTodoUserId, data: TypeTodo) => void;
  deleteTodoHandler: (todoId: TypeTodoId, userId: TypeTodoUserId) => void;
};

function ItemTodo({ todo, updateTodoHandler, deleteTodoHandler }: PropsType): JSX.Element {
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState<boolean>(false);

  return (
    <div className="card mb-3 p-1">
      <div className="card-body">
        <h5 className="card-title">
          <span className="fw-bold me-2">Название:</span> {todo.title}
        </h5>
        <p className="card-text">
          <span className="fw-bold me-2">Описание:</span>
          <span style={{ whiteSpace: 'pre-line' }}>{todo.description}</span>
        </p>
        <p className="card-text">
          <span className="fw-bold me-2">Статус:</span>
          <span className={`badge ${todo.isDone ? 'bg-success' : 'bg-primary'}`}>
            {todo.isDone ? 'Выполнена' : 'В работе'}
          </span>
        </p>
        {isOpenUpdateForm ? (
          <UpdateForm
            todo={todo}
            setIsOpenUpdateForm={setIsOpenUpdateForm}
            updateTodoHandler={updateTodoHandler}
          />
        ) : (
          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => setIsOpenUpdateForm(true)}
            >
              Изменить задачу
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => deleteTodoHandler(todo.id, todo.userId)}
            >
              Удалить задачу
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(ItemTodo);
