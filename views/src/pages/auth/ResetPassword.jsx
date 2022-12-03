import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Card, Container, Form, FormCtrl, Wrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { reset, resetPassword } from "../../features/auth/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3500/api/auth/";

const INITAIL_FORM = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState(INITAIL_FORM);
  const [verifyingToken, setVerifyingToken] = useState(true);
  const [tokenVerified, setTokenVerified] = useState(false);
  const { password, confirmPassword } = formData;

  const {token} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
  //  const token = param.token
    // verify token from forgot password
    const verifyToken = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}verifyToken?token=${token}`
        );

        setFormData((prevState) => ({
          ...prevState,
          email: data,
        }));
        setTokenVerified(true);
        setVerifyingToken(false);
      } catch (error) {
        setTokenVerified(false);
        setVerifyingToken(false);
      }
    };
    verifyToken();
  }, [setFormData, setTokenVerified,setVerifyingToken, token]);

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

  const step1 = tokenVerified ? (
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
  ) : (
    <Card>
      <div className="inner_card">
        <div className="illustration">illustration</div>
        <div className="message">
          <h1>Opps!!!</h1>
          <p>Error !!!</p>
        </div>
      </div>
    </Card>
  );

  const step2 = isSuccess ? (
    <Card>
      <div className="inner_card">
        <div className="illustration">illustration</div>
        <div className="message">
          <h1>Opps!!!</h1>
          <p>Password Successfully Changed!!!</p>
        </div>
      </div>
    </Card>
  ) : (
    step1
  );

  const content = verifyingToken ? (
    <Loading type="points" color={"primary"} className={"btn"} />
  ) : (
    step2
  );

  return (
    <Layout>
      <Container>{content}</Container>
    </Layout>
  );
};

export default ResetPassword;
