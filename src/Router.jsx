import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import MultiStepForm from "./pages/MultiStepForm";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "/", element: <MultiStepForm /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
