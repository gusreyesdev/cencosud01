import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import validator from "validator";
import Swal from 'sweetalert2';


import { useForm } from '../../../hooks/useForm';
import { startLogin } from '../../../reducers/auth/actions';
import { Loader } from '../../ui/Loader';



export const Login = () => {

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.ui);

  const navigate = useNavigate();

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startLogin(email, password));

      navigate('/detour', {
        replace: true
      });

    }

  }

  const isFormValid = () => {

    if (!validator.isEmail(email)) {

      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Email no es valido' });
      return false;

    } else if (password.length < 6) {

      Swal.fire({ icon: 'warning', title: 'Contraseña no es validad debe tener 6 caracteres' });
      return false;
    }

    return true;
  }


  const handleGoToRegister = (e) => {

    e.preventDefault();

    navigate('/register', {
    });
  }


  return (
    <div className="container mt-5">

      <form onSubmit={handleLogin} >

        {
          (loading) &&

          <Loader />
        }

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
          <label>Password</label>
        </div>

        <div className="d-grid gap-2" >

          <button
            className="btn btn-primary"
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>

        </div>

        <div className="d-grid gap-2 mt-2" >

          <button
            className="btn btn-secondary"
            onClick={handleGoToRegister}
          >
            Agregar Profesor
          </button>

        </div>

      </form>


    </div>
  )
}
