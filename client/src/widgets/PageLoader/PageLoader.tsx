import React from 'react';
import Loader from '../../shared/ui/Loader/Loader';

function PageLoader(): JSX.Element {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {' '}
      <Loader />
    </div>
  );
}

export default PageLoader;
