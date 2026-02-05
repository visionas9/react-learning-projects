import { createBrowserRouter } from "react-router-dom";
import Signin from "./src/components/Signin";
import Header from "./src/components/Header";
import Dashboard from "./src/routes/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);
