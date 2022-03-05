import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const PublicRouter = ({ children }) => {

  const { id } = useSelector(state => state.auth);

  return !!id
    ? <Navigate to="/detour" /> 
    : children
}
