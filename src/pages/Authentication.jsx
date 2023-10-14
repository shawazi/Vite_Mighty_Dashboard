import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { Container, Button } from "@chakra-ui/react";

const Authentication = () => {
  const [loginView, setLoginView] = useState(true);

  return (
    <main>
      <Container maxW="2xl" centerContent mt="5em">
        {loginView ? <Login /> : <Register />}
        <Button
          variant="primary"
          onClick={() => {
            setLoginView(!loginView);
          }}
          mt="5em"
        >
          {loginView ? "Register Instead" : "Login Instead"}
        </Button>
      </Container>
    </main>
  );
};

export default Authentication;
