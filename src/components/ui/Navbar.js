import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../../reducers/auth/actions';


export const Navbar = () => {

  const dispatch = useDispatch();

  const { name, profile } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

      <div className="navbar-collapse">
        <div className="navbar-nav">

          {
            (profile.name !== 'Profesor') ?

              <NavLink
                className={({ isActive }) => 'nav-item nav-link text-nowrap ' + (isActive ? 'active' : '')}
                to="/qualification"
              >
                Listado Cursos
              </NavLink>
            :
              <>
                <NavLink
                  className={({ isActive }) => 'nav-item nav-link text-nowrap ' + (isActive ? 'active' : '')}
                  to="/course"
                >
                  Listado Cursos
                </NavLink>

                <NavLink
                  className={({ isActive }) => 'nav-item nav-link text-nowrap ' + (isActive ? 'active' : '')}
                  to="/createCourse"
                >
                  Crear Curso
                </NavLink>

                <NavLink
                  className={({ isActive }) => 'nav-item nav-link text-nowrap ' + (isActive ? 'active' : '')}
                  to="/createStudent"
                >
                  Agregar Estudiante
                </NavLink>

              </>
          }

        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">

          <span className="nav-item nav-link text-info">
            {name}
          </span>

          <button
            className="nav-item nav-link btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    </nav >
  )
}