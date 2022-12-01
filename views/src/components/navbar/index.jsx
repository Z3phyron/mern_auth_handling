import { useState } from "react";
import { Container, LinkEl, Logo, Menu, Toggle, SwitchEl } from "./styles";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline, IoMoonSharp } from "react-icons/io5";

import { MdWbSunny } from "react-icons/md";
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

const Index = (props) => {
  const { token } = useSelector((state) => state.auth);
  const [mode, setMode] = useState(false);
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const { toggleTheme } = props;

  const changeMode = () => {
    setMode(!mode);
    toggleTheme();
  };
  return (
    <Container>
      <Logo to="/">Logo</Logo>
      <Toggle onClick={() => setToggle(!toggle)}>
        {toggle ? <IoCloseOutline /> : <HiBars3BottomRight />}
      </Toggle>
      <SwitchEl
        checked={mode}
        size="sm"
        color="secondary"
        onChange={changeMode}
        iconOn={<MdWbSunny />}
        iconOff={<IoMoonSharp />}
      />
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
          <Button auto color="error" size='sm' onPress={() => dispatch(SignOut())}>
            Sign Out
          </Button>
        ) : null}
      </Menu>
    </Container>
  );
};

export default Index;
