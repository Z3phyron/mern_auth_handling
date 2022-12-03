import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import VerifyMail from "../pages/auth/VerifyMail";
import Welcome from "../pages/auth/Welcome";
import Home from '../pages/home'
import Profile from '../pages/profile'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/sign-in",
    element: <SignIn/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/welcome",
    element: <Welcome/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path: "/verifyMail",
    element: <VerifyMail/>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
]);

export default router