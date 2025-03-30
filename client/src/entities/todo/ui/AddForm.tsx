import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import type { TypeTodoUserId, TypeTodoWithoutId } from '../types/todoTypes';

type TypeProps = {
  addTodoHandler: (userId: TypeTodoUserId, data: TypeTodoWithoutId) => Promise<void> | void;
  setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddForm({ addTodoHandler, setOpenAddForm }: TypeProps): JSX.Element {
  const { userId } = useParams<{ userId: string }>();
  const userIdNumber = Number(userId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      isDone: false,
      description: '',
      userId: userIdNumber,
    },
  });

  const onSubmit = (data: TypeTodoWithoutId): void => {
    const processedData = {
      ...data,
      title: data.title.trim(),
      description: data.description.trim(),
      userId: userIdNumber,
    };

    void addTodoHandler(processedData.userId, processedData);
    reset();
    setOpenAddForm(false);
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      className="p-3 border rounded-3 bg-light mb-3"
    >
      <h4 className="mb-4 text-center display-7">Добавить новую задачу</h4>

      <div className="mb-3">
        <label htmlFor="inputTitle" className="form-label w-100 ">
          Название задачи*
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="inputTitle"
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
        <label htmlFor="inputDescription" className="form-label w-100">
          Описание задачи*
          <textarea
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="inputDescription"
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
        <label className="form-check-label" htmlFor="isDoneSwitch">
          {watch('isDone') ? 'Задача выполнена' : 'Задача не выполнена'}
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="isDoneSwitch"
            {...register('isDone')}
          />
        </label>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-3">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="btn btn-success flex-grow-1"
        >
          Создать
        </button>
        <button
          type="button"
          onClick={() => setOpenAddForm(false)}
          className="btn btn-outline-secondary flex-grow-1"
          disabled={isSubmitting}
        >
          Отменить
        </button>
      </div>
    </form>
  );
}

export default AddForm;
