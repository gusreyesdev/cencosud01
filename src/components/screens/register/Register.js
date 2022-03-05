import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import validator from "validator";
import Swal from 'sweetalert2';


import { useForm } from '../../../hooks/useForm';
import { startRegister } from '../../../reducers/auth/actions';
import { Loader } from '../../ui/Loader';


export const Register = () => {

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.ui);

  const navigate = useNavigate();

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    profile_name: 'Profesor'
  });

  const { name, email, password, profile_name } = formValues;

  const isFormValid = () => {

    if (name.trim().length === 0) {

      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Nombre es obligatorio' });
      return false;

    } else if (!validator.isEmail(email)) {

      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Email no es valido' });
      return false;

    } else if (password.length < 6) {

      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Contraseña no es validad debe tener 6 caracteres' });
      return false;
    }

    return true;
  }


  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegister(name, email, password, profile_name));

      navigate('/detour', {
        replace: true
      });
    }

  }


  return (
    <div className="container mt-5">

      <form onSubmit={handleRegister} >

        {
          (loading) &&

          <Loader />
        }

        <div className="form-floating mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={handleInputChange}
          />
          <label>Nombre</label>
        </div>

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
          <label>Contraseña</label>
        </div>

        <div className="d-grid gap-2 mt-2" >

          <button
            className="btn btn-secondary"
            onClick={handleRegister}
            disabled={loading}
          >
            Registrar
          </button>

        </div>

      </form>


    </div>
  )


}
