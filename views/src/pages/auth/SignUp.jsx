import { Button, Input, Loading } from "@nextui-org/react";
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
  signUp,
} from "../../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const INITAIL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const { token, isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState(INITAIL_FORM);
  const { firstName, lastName, email, password, confirmPassword } = formData;

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
        dispatch(reset());
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
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signUp(userData));
    dispatch(reset());
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <Form onSubmit={onSubmit}>
            <FormCtrl>
              <Input
                fullWidth
                bordered
                aria-label=".."
                color="primary"
                placeholder="First Name...."
                size="lg"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
              <Input
                fullWidth
                bordered
                aria-label=".."
                color="primary"
                placeholder="Last Name...."
                size="lg"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
            </FormCtrl>
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
                status={user ? "error" : null}
                helperColor={"error"}
                helperText={user ? "user with email already exists" : null}
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
              <Input.Password
                fullWidth
                bordered
                aria-label=".."
                color="primary"
                placeholder="Confirm Password...."
                size="lg"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
              />
            </FormCtrl>
            <Button rounded type="submit" size={"lg"}>
              {isLoading ? (
                <Loading type="points" color={"white"} className={"btn"} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default SignUp;
