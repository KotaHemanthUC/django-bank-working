import Login from "./components/Login";
import TransactionsDashboard from "./components/TransactionsDashboard";
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

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const routes = (
  <React.Fragment>
    <Route path="login" element={<Login />} />,
    <Route path="/" element={<Root />}>
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
      <Route
        path="transactions"
        element={
          <ProtectedElement>
            <TransactionsDashboard />
          </ProtectedElement>
        }
      />
      ,
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
