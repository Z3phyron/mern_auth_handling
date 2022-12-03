import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Container, Form, FormCtrl, Wrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { reset } from "../../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../features/auth/AuthSlice";

const INITAIL_FORM = {
  useEmail: "",
};

const ForgotPassword = () => {
  const { email, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState(INITAIL_FORM);
  const { userEmail } = formData;

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
    if (isSuccess && email) {
      toast.success(message);

      dispatch(reset());
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isSuccess, navigate, dispatch, isError, message, email]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      userEmail,
    };
    // alert(JSON.stringify(formData));
    dispatch(forgotPassword(userData));
    dispatch(reset());
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <Form onSubmit={onSubmit}>
            <h1>Recover your password</h1>
            <p>
               You can request a password reset below. We
              will send a security code to the email address, please make sure
              it is correct.
            </p>
            <FormCtrl>
              <Input
                fullWidth
                bordered
                aria-label=".."
                color="primary"
                placeholder="Email...."
                size="lg"
                name="email"
                value={userEmail}
                onChange={onChange}
              />
            </FormCtrl>

            <Button rounded type="submit" size={"lg"} disabled={isLoading}>
              {isLoading ? (
                <Loading type="points" color={"white"} className={"btn"} />
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
