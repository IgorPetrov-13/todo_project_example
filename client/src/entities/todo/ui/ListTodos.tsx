import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/providers/store/store';
import ItemTodo from './ItemTodo';
import AddForm from './AddForm';
import { addTodo, deleteTodo, updateTodo } from '../model/todoSlice';
import type { TypeTodo, TypeTodoId, TypeTodoUserId, TypeTodoWithoutId } from '../types/todoTypes';
import PageLoader from '../../../widgets/PageLoader/PageLoader';

function ListTodos(): JSX.Element {
  const userTodos = useAppSelector((store) => store.todos);
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('all-todos');

  const addTodoHandler = (userId: TypeTodoUserId, data: TypeTodoWithoutId): void => {
    void dispatch(addTodo({ userId, data }));
  };

  const updateTodoHandler = (todoId: TypeTodoId, userId: TypeTodoUserId, data: TypeTodo): void => {
    void dispatch(updateTodo({ todoId, userId, data }));
  };

  const deleteTodoHandler = (todoId: TypeTodoId, userId: TypeTodoUserId): void => {
    void dispatch(deleteTodo({ todoId, userId }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortType(e.target.value);
  };

  const sortedTodos = userTodos.todos.filter((todo) => {
    switch (sortType) {
      case 'active-todos':
        return !todo.isDone;
      case 'completed-todos':
        return todo.isDone;
      default:
        return true;
    }
  });

  if (userTodos.isLoading) {
    return <PageLoader />;
  }

  if (!user.user?.id) {
    navigate('/registration');
  }

  return (
    <div>
      <div>
        {openAddForm ? (
          <AddForm addTodoHandler={addTodoHandler} setOpenAddForm={setOpenAddForm} />
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-outline-primary mb-3"
              onClick={() => setOpenAddForm((prev) => !prev)}
            >
              Добавить задачу
            </button>
            <div className="mb-3">
              <select className="form-select" value={sortType} onChange={handleSortChange}>
                <option value="all-todos">Все задачи</option>
                <option value="active-todos">Активные задачи</option>
                <option value="completed-todos">Завершенные задачи</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {sortedTodos.length ? (
        <div>
          {sortedTodos.map((todo) => (
            <ItemTodo
              key={todo.id}
              todo={todo}
              updateTodoHandler={updateTodoHandler}
              deleteTodoHandler={deleteTodoHandler}
            />
          ))}
        </div>
      ) : (
        <div>У вас еще нет задач</div>
      )}
    </div>
  );
}
export default ListTodos;
