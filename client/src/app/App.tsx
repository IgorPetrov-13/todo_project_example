import React, { useEffect } from 'react';
import './App.css';
import Navbar from '../widgets/navbar/Navbar';
import AppRoutes from './providers/routes/AppRoutes';
import { useAppDispatch } from './providers/store/store';
import { refreshUser } from '../entities/user/model/userSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);
  
  return (
    <div className='container'>
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
