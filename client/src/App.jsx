import React from 'react';
import AppRoutes from './routes';
import NavBar from './components/NavBar';
import { useAuth } from './context/AuthContext';
import SideBar from './components/SideBar';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex grow">
        {isAuthenticated && <SideBar />}
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
