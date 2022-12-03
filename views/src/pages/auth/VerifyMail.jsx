import React from "react";
import { useEffect } from "react";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyMail } from "../../features/auth/AuthSlice";
import { Card, Container } from "./styles";
import { Button, Loading } from "@nextui-org/react";


const VerifyMail = () => {
  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    dispatch(verifyMail(token));
  }, [dispatch]);

  const value = isSuccess ? (
    <Card>
      <div className="inner_card">
        <div className="illustration">illustration</div>
        <div className="message">
          <p>Email verified Successfully!!!</p>
          <p>Thanks for joining us!!!</p>
          <Button auto onPress={() => navigate("/sign-in")}> Sign In</Button>
        </div>
      </div>
    </Card>
  ) : (
    <Card>
      <div className="inner_card">
        <div className="illustration">illustration</div>
        <div className="message">
          <h1>Opps!!!</h1>
          <p>Error verifying email!!!</p>
        </div>
      </div>
    </Card>
  );

  const content = isLoading ? (
    <Loading type="points" color={"primary"} className={"btn"} />
  ) : (
    value
  );

  return (
    <Layout>
      <Container>{content}</Container>
    </Layout>
  );
};

export default VerifyMail;
