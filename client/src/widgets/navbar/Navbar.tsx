import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/providers/store/store';

type TypeStyles = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};
function Navbar(): JSX.Element {
  const user = useAppSelector((store) => store.user.user);

  const links = user
    ? [
        { to: '/', label: 'Главная' },
        { to: `/todos/user/${user.id}`, label: 'Мои задачи' },
        { to: '/logout', label: 'Выход' },
      ]
    : [
        { to: '/', label: 'Главная' },
        { to: '/auth', label: 'Вход' },
        { to: '/registration', label: 'Регистрация' },
      ];

  const getNavLinkStyle = ({
    isActive,
    isPending,
    isTransitioning,
  }: TypeStyles): React.CSSProperties => ({
    fontWeight: isActive ? 'bold' : '',
    color: isPending ? 'red' : 'black',
    viewTransitionName: isTransitioning ? 'slide' : '',
  });

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-evenly">
            {links.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink className="nav-link" to={to} style={getNavLinkStyle}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
