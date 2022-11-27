import { useSelector } from "react-redux";
import Layout from "../../components/layout";
import { Container } from "./styles";

const Index = () => {
  const { user, token } = useSelector((state) => state.auth);
  return (
    <Layout>
      <Container>
        {token ? (
          <>
            <h1>Logged in as: </h1>
            <h1>
              {user?.lastName} {user?.firstName}
            </h1>
          </>
        ) : (
          <h1>Not Logged In</h1>
        )}
      </Container>
    </Layout>
  );
};

export default Index;
