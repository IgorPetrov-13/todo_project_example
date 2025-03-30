import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/providers/store/store';

function HomePage(): JSX.Element {
  const user = useAppSelector((store) => store.user.user);

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-3">
        <h1 className="display-5 mb-3">
          {user ? `Добро пожаловать, ${user.name}!` : 'Добро пожаловать в TaskManager!'}
        </h1>
        <p className="lead text-muted">
          Удобный инструмент для организации ваших задач и повышения продуктивности
        </p>
      </div>

      <div className="row justify-content-center mb-3">
        <div className="col-auto">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {user ? (
              <Link to={`todos/user/${user.id}`} className="btn btn-primary btn-lg px-4">
                Мои задачи
              </Link>
            ) : (
              <p className="lead text-muted">
                Вы можете{' '}
                <Link to="/auth" className="px-4">
                  Войти
                </Link>{' '}
                или
                <Link to="/registration" className="px-4">
                  Зарегистрироваться
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
