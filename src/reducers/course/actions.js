import { types } from "./types";
import axios from "axios";
import Swal from 'sweetalert2';
import { finishLoading, startLoading } from "../ui/actions";



export const startCoursesTeacher = () => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem('token') || '';

            const response = await axios.get(baseUrl + 'courses/getCourseByTeacher',
                {
                    headers: {
                        'x-token': token
                    }
                }
            );

            const dataResponse = response.data.course;

            dispatch(finishLoading());
            dispatch(loaded(dataResponse));

        } catch (error) {

            if (Object.keys(error.response.data).length > 0) {

                const errorResponse = error.response.data;

                if (errorResponse.errors) {

                    for (const key in errorResponse.errors) {

                        const response = errorResponse.errors[key];

                        dispatch(finishLoading());

                        Swal.fire({ icon: 'error', title: 'Error', text: response.msg })
                    }

                } else {

                    dispatch(finishLoading());

                    Swal.fire({ icon: 'warning', title: 'Error', text: errorResponse.msg })

                }
            }

        }

    }
}


export const startCoursesStudent = () => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem('token') || '';


            const response = await axios.get(baseUrl + 'courses/getCourseByStudent',
                {
                    headers: {
                        'x-token': token
                    }
                }
            );

            const dataResponse = response.data.course;

            dispatch(finishLoading());

            dispatch(loaded(dataResponse));

        } catch (error) {

            if (Object.keys(error.response.data).length > 0) {

                const errorResponse = error.response.data;

                if (errorResponse.errors) {

                    for (const key in errorResponse.errors) {

                        const response = errorResponse.errors[key];

                        dispatch(finishLoading());

                        Swal.fire({ icon: 'error', title: 'Error', text: response.msg })
                    }

                } else {

                    dispatch(finishLoading());

                    Swal.fire({ icon: 'warning', title: 'Error', text: errorResponse.msg })

                }
            }
        }
    }
}


export const startCourse = (id) => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem('token') || '';

            const response = await axios.get(baseUrl + 'courses/getCourseById/' + id,
                {
                    headers: {
                        'x-token': token
                    }
                }
            );

            const dataResponse = response.data;

            dispatch(finishLoading());
            dispatch(active(dataResponse.course));

        } catch (error) {

            if (Object.keys(error.response.data).length > 0) {

                const errorResponse = error.response.data;

                if (errorResponse.errors) {

                    for (const key in errorResponse.errors) {

                        const response = errorResponse.errors[key];

                        dispatch(finishLoading());

                        Swal.fire({ icon: 'error', title: 'Error', text: response.msg })
                    }

                } else {

                    dispatch(finishLoading());

                    Swal.fire({ icon: 'warning', title: 'Error', text: errorResponse.msg })

                }
            }

        }


    }

}

export const startUpdate = (name, students, course_id) => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem('token') || '';

            const response = await axios.put(baseUrl + 'courses/updateCourses/' + course_id,
                {
                    name: name,
                    students: students
                },
                {
                    headers: {
                        'x-token': token
                    }
                }
            );

            const dataResponse = response.data;

            dispatch(finishLoading());
            dispatch(updated(dataResponse));

        } catch (error) {

            if (Object.keys(error.response.data).length > 0) {

                const errorResponse = error.response.data;

                if (errorResponse.errors) {

                    for (const key in errorResponse.errors) {

                        const response = errorResponse.errors[key];

                        dispatch(finishLoading());

                        Swal.fire({ icon: 'error', title: 'Error', text: response.msg })
                    }

                } else {

                    dispatch(finishLoading());

                    Swal.fire({ icon: 'warning', title: 'Error', text: errorResponse.msg })

                }
            }

        }

    }

}


export const startCreate = (name, students) => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem('token') || '';

            const response = await axios.post(baseUrl + 'courses/createCourses',
                {
                    name: name,
                    students: students
                },
                {
                    headers: {
                        'x-token': token
                    }
                }
            );

            const dataResponse = response.data.course;

            dispatch(finishLoading());

            dispatch(create(dataResponse));

        } catch (error) {

            if (Object.keys(error.response.data).length > 0) {

                const errorResponse = error.response.data;

                if (errorResponse.errors) {

                    for (const key in errorResponse.errors) {

                        const response = errorResponse.errors[key];

                        dispatch(finishLoading());

                        Swal.fire({ icon: 'error', title: 'Error', text: response.msg })
                    }

                } else {
                    dispatch(finishLoading());

                    Swal.fire({ icon: 'warning', title: 'Error', text: errorResponse.msg })

                }

            }

        }

    }

}


const loaded = (courses) => ({
    type: types.loaded,
    payload: courses
});

const active = (course) => ({
    type: types.active,
    payload: course
});

const create = (course) => ({
    type: types.create,
    payload: course
});

const updated = (course) => ({
    type: types.updated,
    payload: course
});