import Login from './components/Login';
import AccountsDashboard from './components/AccountsDashboard';
import TransactionsDashboard from './components/TransactionsDashboard';
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
import VerticalTabs from './components/Home';

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
      <Route path="home" element={<VerticalTabs />} />,
      <Route path="accounts" element={<AccountsDashboard />} />,
      <Route path="transactions" element={<TransactionsDashboard />} />,
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
