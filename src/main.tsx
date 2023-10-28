import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PetDetail } from "./PetDetail.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "cats/:id", element: <PetDetail /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
