import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Detail } from "./Pages/Detail";
import { NotFound } from "./Pages/NotFound";
import { Layout } from "./Components/Layout";
const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export { Router };
