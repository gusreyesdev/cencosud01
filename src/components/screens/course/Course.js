import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { startCoursesTeacher } from '../../../reducers/course/actions';
import { Loader } from '../../ui/Loader';


export const Course = () => {

  const dispatch = useDispatch();

  const { courses } = useSelector(state => state.course);
  const { loading } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(startCoursesTeacher());
  }, [dispatch])


  return (
    <div>

      {
        (loading) &&

        <Loader />

      }

      <h1 className="text-center" > Listado de Cursos </h1>
      <ul className="list-group">
        {
          courses.map((course) =>
            <li className="list-group-item" key={course._id} >
              <Link style={{ textDecoration: 'none' }} className="d-block" to={`/grade/${course._id}`} > {course.name} </Link>

              <p style={{ textAlign: 'right' }}>
                <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCourse" aria-expanded="false" aria-controls="collapseCourse">
                 Ver calificaciones
                </button>
              </p>

              {
                course.students.map((student) =>

                  <div className="collapse" id="collapseCourse" key={student._id} >
                    <div className="card card-body">
                      <div className="row">

                        <div className="col-6" >
                          {student.student.name}
                        </div>

                        <div className="col-6" >
                          {student.grade}
                        </div>

                      </div>
                    </div>
                  </div>
                )
              }

            </li>
          )
        }
      </ul>
    </div>
  )

}
