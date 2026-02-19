import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Pharmacy from "./pages/Pharmacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/chat",
    Component: Chat,
  },
  {
    path: "/pharmacy",
    Component: Pharmacy,
  },
]);
