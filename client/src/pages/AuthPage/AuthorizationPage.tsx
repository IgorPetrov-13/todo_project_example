import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { TypeUserAuthorization } from '../../entities/user/types/userTypes';
import { useAppDispatch, useAppSelector } from '../../app/providers/store/store';
import { authorizationUser } from '../../entities/user/model/userSlice';
import PageLoader from '../../widgets/PageLoader/PageLoader';

function AuthorizationPage(): JSX.Element {
  const { user, error, isLoading } = useAppSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TypeUserAuthorization>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user?.id) {
      navigate('/');
    }
  }, [user?.id]);

  const onSubmit = (data: TypeUserAuthorization): void => {
    dispatch(authorizationUser(data))
      .unwrap()
      .catch((errorMessage) => console.error(errorMessage));
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <form
      className="d-flex flex-column align-items-center"
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <h2 className="display-6 mb-4 mt-4">Вход</h2>

      <label htmlFor="input-email">
        Email
        <input
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          {...register('email', {
            required: 'Введите email',
            minLength: {
              value: 4,
              message: 'Минимум 4 символа',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Не верный email',
            },
          })}
        />
      </label>
      {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}

      <label htmlFor="input-password">
        Пароль
        <input
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          type="password"
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
        />
      </label>
      {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <button type="submit" className="btn btn-outline-primary mt-3" disabled={!isValid}>
        Отправить
      </button>
    </form>
  );
}

export default AuthorizationPage;
