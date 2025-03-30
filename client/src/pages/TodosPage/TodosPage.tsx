import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/providers/store/store';
import { loadAllUsersTodos } from '../../entities/todo/model/todoSlice';
import ListTodos from '../../entities/todo/ui/ListTodos';

function TodosPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { userId } = useParams();

  useEffect(() => {
    void dispatch(loadAllUsersTodos(Number(userId)));
  }, []);

  return (
    <div className="container mt-3">
      <h1 className='display-6 mb-4'>Ваши задачи</h1>
      <ListTodos />
    </div>
  );
}
export default TodosPage;
