import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { Container, Button } from "@chakra-ui/react";

const Authentication = () => {
  const [loginView, setLoginView] = useState(true);

  return (
    <main>
      <Container maxW="2xl" centerContent mt="8em">
        <Button variant="secondary" onClick={() => { setLoginView(!loginView) }}>{loginView ? "Register Instead" : "Log In Instead"}</Button>
        {loginView ? <Login /> : <Register />}
      </Container>
    </main>
  );
};

export default Authentication;
