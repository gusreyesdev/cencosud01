import { types } from "./types";
import axios from "axios";
import Swal from 'sweetalert2'
import { finishLoading, startLoading } from "../ui/actions";


export const startLogin = (email, password) => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;

            const response = await axios.post(baseUrl + 'auth/login',
                {
                    email: email,
                    password: password
                }
            );

            const dataResponse = response.data;

            localStorage.setItem('token', dataResponse.token);
            localStorage.setItem('token-init-data', new Date().getTime());

            dispatch(
                login(
                    {
                        id: dataResponse.id,
                        name: dataResponse.name,
                        profile: dataResponse.profile
                    }
                )
            )

            dispatch(finishLoading());

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


export const startRegister = (name, email, password, profile_name) => {

    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const baseUrl = process.env.REACT_APP_API_URL;

            const response = await axios.post(baseUrl + 'auth/newUser',
                {
                    name: name,
                    email: email,
                    password: password,
                    profile_name: profile_name
                }
            );

            const dataResponse = response.data;

            localStorage.setItem('token', dataResponse.token);
            localStorage.setItem('token-init-data', new Date().getTime());

            if (profile_name !== 'Estudiante') {

                dispatch(
                    login(
                        {
                            id: dataResponse.id,
                            name: dataResponse.name,
                            profile: dataResponse.profile
                        }
                    )
                )

            }


            dispatch(finishLoading());

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


export const startChecking = () => {

    return async (dispatch) => {

        try {

            const baseUrl = process.env.REACT_APP_API_URL;
            const token = localStorage.getItem('token') || '';

            const response = await axios.get(baseUrl + 'auth/reviveToken',
                {
                    headers: {
                        'x-token': token
                    }
                }
            );

            const dataResponse = response.data;

            dispatch(
                login(
                    {
                        id: dataResponse.id,
                        name: dataResponse.name,
                        profile: dataResponse.profile
                    }
                )
            )

        } catch (error) {

            if (Object.keys(error.response.data).length > 0) {
                dispatch(checkingFinish())
            }

        }

    }

}

const checkingFinish = () => ({ type: types.checkingFinish });

const login = (user) => ({
    type: types.login,
    payload: user
});

export const startLogout = () => {

    return async (dispatch) => {
        localStorage.clear();
        dispatch(logOut());
    }

}

const logOut = () => ({ type: types.logout });