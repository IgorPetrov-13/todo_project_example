import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/providers/store/store';
import { logoutUser } from '../../entities/user/model/userSlice';
import PageLoader from '../../widgets/PageLoader/PageLoader';

function LogoutPage(): JSX.Element {
  const { user, isLoading } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      navigate('/');
    }
  }, [user?.id]);

  const logout = (): void => {
    void dispatch(logoutUser());
  };

  if (isLoading || !user) {
    return <PageLoader />;
  }

  return (
    <div className="d-flex flex-column   gap-3 mt-5">
      <h3 className="display-6 mb-4">Вы действительно хотите выйти, {user?.name}?</h3>
      
      <div className="d-flex justify-content-center gap-3">
        <button type="submit" className="btn btn-success" onClick={() => navigate('/')}>
          Остаться
        </button>
        <button type="button" className="btn btn-outline-danger" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default LogoutPage;
