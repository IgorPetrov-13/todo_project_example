import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import PageLoader from '../../../widgets/PageLoader/PageLoader';
import { useAppDispatch } from '../store/store';
import { clearError } from '../../../entities/user/model/userSlice';

const HomePage = lazy(() => import('../../../pages/HomePage/HomePage'));
const NotFound = lazy(() => import('../../../pages/NotFoundPage/NotFound'));
const LogoutPage = lazy(() => import('../../../pages/LogoutPage/LogoutPage'));
const AuthorizationPage = lazy(() => import('../../../pages/AuthPage/AuthorizationPage'));
const RegistrationPage = lazy(() => import('../../../pages/RegistrationPage/RegistrationPage'));
const TodosPage = lazy(() => import('../../../pages/TodosPage/TodosPage'));

function ErrorFallback({ error }: FallbackProps): React.JSX.Element {
  return (
    <div className="error-fallback">
      <p>Произошла ошибка:</p>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <pre>{error.message}</pre>
    </div>
  );
}

function AppRoutes(): JSX.Element {
  function ClearErrorOnNavigate(): null {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(clearError());
    }, [location.pathname, dispatch]);

    return null;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ClearErrorOnNavigate />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="todos/user/:userId" element={<TodosPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRoutes;
