import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import React from 'react';

const routes = (
  <React.Fragment>
    <Route index element={<Login />} />,
    <Route path="dashboard" element={<Dashboard />} />,
    <Route path="register" element={<Register />} />,
  </React.Fragment>
);

const routeArray = createRoutesFromElements(routes);


function App() {
  const router = createBrowserRouter(routeArray);
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
