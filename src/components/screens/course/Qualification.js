import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { startCoursesStudent } from '../../../reducers/course/actions';
import { Loader } from '../../ui/Loader';




export const Qualification = () => {

  const dispatch = useDispatch();

  const { courses } = useSelector(state => state.course);
  const { loading } = useSelector(state => state.ui);


  useEffect(() => {
    dispatch(startCoursesStudent());
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

            <div key={course._id} >

              {
                (course.name) &&

                <li className="list-group-item"  >

                  <p className="text-xl-start" > {course.name} </p>

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
                              <p className="text-center"> {student.grade} </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    )
                  }

                </li>

              }

            </div>

          )
        }
      </ul>

    </div>
  )
}
