import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerList from "./components/CustomerList.jsx";
import TrainingList from "./components/TrainingList.jsx";
import TrainingCalendar from "./components/TrainingCalendar.jsx";
import TrainingStatistics from "./components/TrainingStatistics.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <CustomerList />, index: true },
      { path: "/trainings", element: <TrainingList /> },
      { path: "/calendar", element: <TrainingCalendar /> },
      { path: "/statistics", element: <TrainingStatistics /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
