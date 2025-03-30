import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { TypeUserRegistration } from '../../entities/user/types/userTypes';
import { useAppDispatch, useAppSelector } from '../../app/providers/store/store';
import { registrationUser } from '../../entities/user/model/userSlice';
import PageLoader from '../../widgets/PageLoader/PageLoader';

type TypeUserRegistrationAndConfirm = TypeUserRegistration & { confirm: string };

function RegistrationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TypeUserRegistrationAndConfirm>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
  });

  useEffect(() => {
    if (user?.id) {
      navigate('/');
    }
  }, [user?.id]);

  const onSubmit = (data: TypeUserRegistrationAndConfirm): Promise<void> | void => {
    if (data.confirm !== data.password) {
      return;
    }

    const { confirm, ...userData } = data;
    dispatch(registrationUser(userData))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.log(err.message);
        }
      });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="d-flex flex-column align-items-center"
    >
      <h2 className="display-6 mb-4 mt-4">Регистрация</h2>

      <label htmlFor="name-input">
        Ваше имя
        <input
          className={`form-control  ${errors.name ? 'is-invalid' : ''}`}
          {...register('name', {
            required: 'Введите имя',
            minLength: {
              value: 3,
              message: 'Минимум три символа',
            },
          })}
        />
      </label>
      {errors?.name && <div style={{ color: 'red' }}>{errors?.name.message || 'Error'}</div>}

      <label htmlFor="email-input">
        Ваш email
        <input
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          {...register('email', {
            required: 'Введите email',
            minLength: {
              value: 4,
              message: 'Минимум четыре символа',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
        />
      </label>
      {errors?.email && <div style={{ color: 'red' }}>{errors?.email.message || 'Error'}</div>}

      <label htmlFor="password-input">
        Пароль
        <input
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          type="password"
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 3,
              message: 'Минимум три символа',
            },
          })}
        />
      </label>
      {errors?.password && (
        <div style={{ color: 'red' }}>{errors?.password.message || 'Error'}</div>
      )}

      <label htmlFor="confirm-input">
        Повторите пароль
        <input
          className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
          type="password"
          {...register('confirm', {
            required: 'Повторите пароль',
            validate: (val: string) => {
              if (watch('password') !== val) {
                return 'Пароли не совпадают';
              }
            },
            minLength: {
              value: 3,
              message: 'Минимум три символа',
            },
          })}
        />
      </label>
      {errors?.confirm && <div style={{ color: 'red' }}>{errors?.confirm.message || 'Error'}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <button type="submit" className="btn btn-outline-primary mt-3" disabled={!isValid}>
        Отправить
      </button>
    </form>
  );
}

export default RegistrationPage;
