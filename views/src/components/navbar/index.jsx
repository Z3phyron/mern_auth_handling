import { useState } from "react";
import { Container, LinkEl, Logo, Menu, Toggle } from "./styles";

import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "@nextui-org/react";
import { SignOut } from "../../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";


const SignedOutRoutes = [
  {
    name: "Home",
    key: "home",
    path: "/",
  },
  {
    name: "Sign In",
    key: "sign-in",
    path: "/sign-in",
  },
  {
    name: "Sign Up",
    key: "sign-up",
    path: "/sign-up",
  },
];
const SignedInRoutes = [
  {
    name: "Home",
    key: "home",
    path: "/",
  },
  {
    name: "Profile",
    key: "profile",
    path: "/profile",
  },
];

const Index = () => {
  const {  token } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  return (
    <Container>
      <Logo>Logo</Logo>
      <Toggle onClick={() => setToggle(!toggle)}>
        {toggle ? <IoCloseOutline /> : <HiBars3BottomRight />}
      </Toggle>
      <Menu toggle={toggle}>
        {token
          ? SignedInRoutes.map((route) => (
              <LinkEl to={route.path} key={route.key}>
                {route.name}
              </LinkEl>
            ))
          : SignedOutRoutes.map((route) => (
              <LinkEl to={route.path} key={route.key}>
                {route.name}
              </LinkEl>
            ))}

        {token ? (
          <Button auto color="error" onPress={() => dispatch(SignOut())}>
            Sign Out
          </Button>
        ) : null}
      </Menu>
    </Container>
  );
};

export default Index;
