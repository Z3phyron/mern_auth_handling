import {  Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Container, Form, FormCtrl, Wrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  reset,
  resetPassword,
} from "../../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const INITAIL_FORM = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState(INITAIL_FORM);
  const { password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
 

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
    if (isSuccess) {
      toast.success(message);

      dispatch(reset());
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    }
  }, [isSuccess, navigate, dispatch, isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      password,
      confirmPassword,
    };
    // alert(JSON.stringify(formData));
    dispatch(resetPassword(userData));
    dispatch(reset());
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <Form onSubmit={onSubmit}>
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
            <FormCtrl>
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
            <Button rounded type="submit" size={"lg"} disabled={isLoading}>
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

export default ResetPassword;
