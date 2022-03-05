import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';

import { startStudents } from '../../../reducers/user/actions';
import { startCreate } from '../../../reducers/course/actions';

import Swal from 'sweetalert2';
import { Loader } from '../../ui/Loader';



export const Create = () => {

  const formRef = useRef();

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.ui);
  const { students } = useSelector(state => state.user);

  const [selectStudent, setSelectStudent] = useState({
    student: ''
  });

  useEffect(() => {
    dispatch(startStudents());
  }, [dispatch])

  const [formValues, handleInputChange, reset] = useForm({
    name: '',
  });

  const { name } = formValues;

  const handleChangeStudent = (e) => {

    let value = Array.from(e.target.selectedOptions, option => option.value);

    setSelectStudent({
      student: value
    })
  }

  const isFormValid = () => {

    if (name.trim().length === 0) {

      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Nombre es obligatorio' });
      return false;

    } else if (Object.keys(selectStudent.student).length <= 1) {

      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Seleccione un estudiante dos o mas Estudiantes' });
      return false;
    }

    return true;

  }

  const handleNewCourse = (e) => {

    e.preventDefault();

    if (isFormValid()) {

      const students = []

      selectStudent.student.forEach(id => {
        students.push({
          "student": id
        })
      });

      dispatch(startCreate(name, students));

      if (!loading) {
        Swal.fire({ icon: 'success', title: 'Informacion', text: 'Curso Creado' });
        formRef.current.reset();
        reset();

      }

    }
  }


  return (
    <div>

      <form ref={formRef} onSubmit={handleNewCourse} >

        {
          (loading) &&

          <Loader />
        }

        <div className="form-floating mt-3 mb-3">

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

        <select className="form-select" multiple defaultValue={['0']} onChange={handleChangeStudent} >

          <option value={['0']} disabled>Seleccione un Estudiante</option>

          {
            students.map((student) =>
              <option key={student._id} value={student._id}>{student.name}</option>
            )
          }

        </select>

        <div className="d-grid gap-2 mt-2" >

          <button
            className="btn btn-primary"
            onClick={handleNewCourse}
            disabled={loading}
          >
            Crear
          </button>

        </div>

      </form>

    </div>
  )
}
