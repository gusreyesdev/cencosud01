import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from "react-router-dom";

//Actions
import { startChecking } from '../reducers/auth/actions';

//Screen
import { Login } from '../components/screens/login/Login';
import { Register } from '../components/screens/register/Register';

//Router
import { PrivateRouter } from './PrivateRouter';
import { DashboardRouter } from './DashboardRouter';
import { PublicRouter } from './PublicRouter';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if (checking) {

        return (
            <div className="containerLoading">
                <div className="spinner-border text-warning loadingCustom" role="status"></div>
            </div>
        )

    }

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/login" element={
                    <PublicRouter>
                        <Login />
                    </PublicRouter>
                } />

                <Route path="/*" element={
                    <PrivateRouter>
                        <DashboardRouter />
                    </PrivateRouter>
                } />

                <Route path="register" element={<Register />} />

            </Routes>

        </BrowserRouter>
    )
}
