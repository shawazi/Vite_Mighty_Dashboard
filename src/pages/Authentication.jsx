import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { Container, Button } from "@chakra-ui/react";

const Authentication = () => {
  const [loginView, setLoginView] = useState(true);

  const toggleForms = () => {
    setLoginView(!loginView);
  };

  return (
    <main>
      <Container
        maxW="2xl"
        centerContent
        boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
        rounded="full"
        mt="6em"
        p="1em"
      >
        <Button variant="primary" onClick={toggleForms}>
          {loginView ? "Register Instead" : "Sign In Instead"}
        </Button>
        {loginView ? <Login /> : <Register />}
      </Container>
    </main>
  );
};

export default Authentication;
