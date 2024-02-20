import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import CreateTransactionForm from "./components/bank/CreateTransactionForm";
import ProtectedElement from "./components/auth/ProtectedElement";
import ErrorBoundary from "./components/errors/ErrorBoundary";

const routes = (
  <React.Fragment>
    <Route path="/" element={<Login />} />,
      <Route
        path="home"
        element={
          <ProtectedElement>
            <Home />
          </ProtectedElement>
        }
      />
      ,
      <Route
        path="transactions/create"
        element={
          <ProtectedElement>
            <CreateTransactionForm />
          </ProtectedElement>
        }
      />
      ,
      <Route path="register" element={<Register />} />,
  </React.Fragment>
);



function App() {
  const routeArray = createRoutesFromElements(routes);
  const router = createBrowserRouter(routeArray);
  return (
    <ErrorBoundary fallback={'There was an error, please check the console'}>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </ErrorBoundary>
  );
}

export default App;
