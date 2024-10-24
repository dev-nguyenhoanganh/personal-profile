import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const LoginPage = React.lazy(() => import('@/pages/LoginPage'));

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
