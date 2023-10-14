import React, { useState } from "react";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { Container, Button } from "@chakra-ui/react";

const Authentication = () => {
  const [loginView, setLoginView] = useState(true);

  return (
    <main>
      <Container maxW="2xl" centerContent>
        {loginView ? <Login /> : <Register />}
        <Button variant="primary" mt="6em"
          onClick={() => { setLoginView(!loginView) }}
        >
          Click here to {loginView ? "Register" : "Login"} instead!
        </Button>
      </Container>
    </main>
  );
};

export default Authentication;
