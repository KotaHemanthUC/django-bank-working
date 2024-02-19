import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Header from './components/Header';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import React from 'react';

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

const routes = (
  <React.Fragment>
    <Route path='/' element={<Root />} >
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />,
      <Route path="dashboard" element={<Dashboard />} />,
      <Route path="register" element={<Register />} />,
    </Route>

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
