import React, { useState } from "react";
import { Container, Button, Text } from "@chakra-ui/react";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
const Authentication = () => {
  const [loginView, setLoginView] = useState(true);

  const handleView = () => {
    setLoginView(!loginView);
  };

  return (
    <main>
      <Container display="flex" flexDirection="column" textAlign="center">
        <Text fontFamily="Comic Sans MS" fontSize="30px">
          {loginView ? "Login" : "Register"}
        </Text>
        {loginView ? <Login /> : <Register />}
        <Button onClick={handleView} variant="primary">
          {loginView ? "Register" : "Login"} Instead
        </Button>
      </Container>
    </main>
  );
};

export default Authentication;
