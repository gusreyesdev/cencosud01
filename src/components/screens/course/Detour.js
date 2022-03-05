import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

export const Detour = () => {

  const { profile } = useSelector(state => state.auth);

  return profile.name === "Profesor" 
  ? <Navigate to="/course" />
  : <Navigate to="/qualification" />

}
