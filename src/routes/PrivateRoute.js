import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function PublicRoute({ children }) {
  const location = useLocation();

  const { token } = useContext(AuthContext)

  if(token){
    return <Navigate to="/" state={{ from: location }} replace />; 
  }

  return (
    children
  )
}

export default PublicRoute