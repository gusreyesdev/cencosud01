import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

import { startCourse, startUpdate } from '../../../reducers/course/actions';
import { Loader } from '../../ui/Loader';


export const Grade = () => {

  const formRef = useRef();

  const dispatch = useDispatch();

  const { courseId } = useParams();

  const { active } = useSelector(state => state.course);
  const { loading } = useSelector(state => state.ui);

  const [selectStudent, setSelectStudent] = useState({});
  const [selectGrade, setSelectGrade] = useState({});

  useEffect(() => {

    dispatch(startCourse(courseId));

  }, [dispatch, courseId])

  const handleChangeStudent = (e) => {
    setSelectStudent({
      student: e.target.value
    })
  }

  const handleChangeGrade = (e) => {
    setSelectGrade({
      grade: e.target.value
    })
  }


  const isFormValid = () => {

    if (Object.keys(selectStudent).length === 0) {
      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Seleccione un estudiante' });
      return false;
    } else if (Object.keys(selectGrade).length === 0) {
      Swal.fire({ icon: 'warning', title: 'Advertencia', text: 'Seleccione una calificacion' });
      return false;
    }

    return true;

  }


  const handleUpdate = (e) => {

    e.preventDefault();

    if (isFormValid()) {

      const students = [
        {
          "student": selectStudent.student,
          "grade": selectGrade.grade
        }
      ]

      dispatch(startUpdate(active.name, students, active._id));

      if (!loading) {
        Swal.fire({ icon: 'success', title: 'Informacion', text: 'Calificacion actualizada' });
        formRef.current.reset();
      }

    }

  }

  return (
    <div>
      {
        (active !== null) &&

        <form ref={formRef} onSubmit={handleUpdate} >

          <>
            {
              (loading) &&

              <Loader />
            }

            <h1 className="text-center">
              Calificar Estudiantes
            </h1>


            <h3 className="text-center">
              {active.name}
            </h3>

            <select  className="form-select" defaultValue="0" onChange={handleChangeStudent} >

              <option value="0" disabled>Seleccione un Estudiante</option>

              {
                active.students.map((students) =>
                  <option key={students.student._id} value={students.student._id}>{students.student.name}</option>
                )
              }

            </select>

            <select className="form-select mt-2" defaultValue="0" onChange={handleChangeGrade} >
              <option value="0" disabled>Seleccion calificacion</option>
              <option value="1">Uno</option>
              <option value="2">Dos</option>
              <option value="3">Tres</option>
              <option value="4">Cuatro</option>
              <option value="5">Cinco</option>
            </select>

            <div className="d-grid gap-2 mt-2" >

              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={loading}
              >
                Calificar
              </button>

            </div>


          </>

        </form>
      }
    </div >
  )
}
