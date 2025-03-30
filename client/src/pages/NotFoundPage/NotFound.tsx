import React from 'react';

function NotFound(): JSX.Element {
  return (
    <div className="container m-3">
      <h1>404</h1>
      <p>Такой страницы еще нет</p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Z9l7wTJSlsWuRvUSVdjbpyEcfeCE8dovYg&s"
        alt="smile"
      />
    </div>
  );
}

export default NotFound;
