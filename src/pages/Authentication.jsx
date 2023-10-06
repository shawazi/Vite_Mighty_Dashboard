import React, { useState } from "react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import { Button, Container } from "@chakra-ui/react";

const Authentication = () => {
  const [loginView, setLoginView] = useState(true);

  const toggleForms = () => {
    setLoginView(!loginView);
  };
  return (
    <div>
      {loginView ? (
        <Container mt="7em">
          <Button variant="primary" onClick={toggleForms}>
            Register
          </Button>
          <Login />
        </Container>
      ) : (
        <Container mt="7em">
          <Button variant="primary" onClick={toggleForms}>
            Log In
          </Button>
          <Register />
        </Container>
      )}
    </div>
  );
};

export default Authentication;
