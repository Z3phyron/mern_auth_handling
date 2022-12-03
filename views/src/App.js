import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "@fontsource/fira-code";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "./hook/useAxiosPrivate";
import { loadUser, reset } from "./features/auth/AuthSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { token, isError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // if (isError) {
    //   dispatch(SignOut());
    // }
    if (token) {
      dispatch(loadUser(axiosPrivate));
      dispatch(reset());
    }
    // setTimeout(() => {
    //   dispatch(reset());
    // }, 500);
  }, [dispatch, token, axiosPrivate, isError]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
