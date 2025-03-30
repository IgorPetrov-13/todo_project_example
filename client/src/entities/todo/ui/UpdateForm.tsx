import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import type { TypeTodo, TypeTodoId, TypeTodoUserId } from '../types/todoTypes';

type TypeProps = {
  todo: TypeTodo;
  setIsOpenUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodoHandler: (todoId: TypeTodoId, userId: TypeTodoUserId, data: TypeTodo) => void;
};
function UpdateForm({ setIsOpenUpdateForm, todo, updateTodoHandler }: TypeProps): JSX.Element {
  const { userId } = useParams<{ userId: string }>();
  const userIdNum = Number(userId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isDone: todo.isDone,
      userId: todo.userId,
    },
  });

  const onSubmit = (data: TypeTodo): void => {
    data.description = data.description.trim();
    data.title = data.title.trim();

    if (userIdNum !== data.userId) return;

    if (data.userId && data.description && data.title) {
      updateTodoHandler(data.id, data.userId, data);
      setIsOpenUpdateForm(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      className="p-3 border rounded-3 bg-light mb-3"
    >
      <h5>Изменить задачу</h5>
      <div className="mb-3">
        <label htmlFor="inputTitleUpd" className="form-label w-100">
          Название задачи*
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="inputTitleUpd"
            {...register('title', {
              required: 'Необходимо написать название',
              minLength: {
                value: 1,
                message: 'Минимум один символ',
              },
            })}
          />
        </label>
        {errors?.title && <div className="invalid-feedback d-block">{errors.title.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="inputDescriptionUpd" className="form-label w-100">
          Описание задачи*
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="inputDescriptionUpd"
            rows={4}
            {...register('description', {
              required: 'Необходимо добавить описание',
              minLength: {
                value: 1,
                message: 'Минимум один символ',
              },
              maxLength: {
                value: 1000,
                message: 'Максимум 1000 символов',
              },
            })}
          />
        </label>
        {errors?.description && (
          <div className="invalid-feedback d-block">{errors.description.message}</div>
        )}
      </div>

      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="isDoneSwitchUpd">
          {watch('isDone') ? 'Задача выполнена' : 'Задача не выполнена'}
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="isDoneSwitchUpd"
            {...register('isDone')}
          />
        </label>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button type="submit" disabled={!isValid} className="btn btn-outline-success">
          Сохранить
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => setIsOpenUpdateForm(false)}
        >
          Отменить
        </button>
      </div>
    </form>
  );
}

export default UpdateForm;
