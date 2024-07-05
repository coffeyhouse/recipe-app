import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SideBar from './SideBar';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex grow">     
      <div className="flex flex-col px-8 py-6 grow">
        {children}
      </div>
    </div>
  );
};

export default PrivateRoute;
