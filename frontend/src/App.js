import Login from "./components/Login";
import Register from "./components/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import CreateTransactionForm from "./components/CreateTransactionForm";
import ProtectedElement from "./ProtectedElement";

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
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
  );
}

export default App;
