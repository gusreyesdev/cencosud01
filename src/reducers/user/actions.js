import { types } from "./types";
import axios from "axios";
import Swal from 'sweetalert2';
import { finishLoading, startLoading } from "../ui/actions";


export const startStudents = () => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem('token') || '';

            const response = await axios.get(baseUrl + 'users/getStudents',
                {
                    headers: {
                        'x-token': token
                    }
                }
            );

            const dataResponse = response.data.students;

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


const loaded = (students) => ({
    type: types.loaded,
    payload: students
});