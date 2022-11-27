import { Avatar, Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Container, Form, FormCtrl, Wrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hook/useAxiosPrivate";
import toast from "react-hot-toast";
import {
  getUser,
  loadUser,
  reset,
  signIn,
} from "../../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const INITAIL_FORM = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { token, isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState(INITAIL_FORM);
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && token) {
      toast.success(message);
      navigate("/");
      dispatch(reset());
      setTimeout(() => {
        dispatch(loadUser(axiosPrivate));
      }, 2000);
    }
    if (email) {
      const getData = setTimeout(() => {
        const data = {
          email: email,
        };
        dispatch(getUser(data));
        dispatch(reset())
      }, 2000);

      return () => clearTimeout(getData);
    }
  }, [
    isSuccess,
    navigate,
    axiosPrivate,
    dispatch,
    isError,
    message,
    token,
    email,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    // alert(JSON.stringify(formData));
    dispatch(signIn(userData));
    dispatch(reset());
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <Form onSubmit={onSubmit}>
            <div className="user">
              {isLoading ? <Loading type="points" /> : null}

              {user ? (
                <div className="info">
                  <div className="image">
                    <Avatar
                      size="lg"
                      src={user?.profile_pic}
                      zoomed
                    />
                  </div>

                  <h1>
                    {user?.lastName} {user?.firstName}
                  </h1>
                </div>
              ) : null}
            </div>

            <FormCtrl>
              <Input
                fullWidth
                bordered
                aria-label=".."
                color="primary"
                placeholder="Email...."
                size="lg"
                name="email"
                value={email}
                onChange={onChange}
              />
            </FormCtrl>
            <FormCtrl>
              <Input.Password
                fullWidth
                bordered
                aria-label=".."
                color="primary"
                placeholder="Password...."
                size="lg"
                name="password"
                value={password}
                onChange={onChange}
              />
            </FormCtrl>
            <Button
              rounded
              shadow
              type="submit"
              size={"lg"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading type="points" color={"white"} className={"btn"} />
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default SignIn;
