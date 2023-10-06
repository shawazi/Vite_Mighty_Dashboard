import React, { useState } from "react";
import {
  Box,
  Container,
  Text,
  Button,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";


const Authentication = () => {
  const [registrationView, setRegistrationView] = useState(false);


  return (
    <Box>
      <Container maxW="2xl" centerContent>
        <Text>
          {registrationView ? "Log in instead" : "Sign up instead"}
          <Button
            variant="primary"
            onClick={() => setRegistrationView(!registrationView)}
          >
            {registrationView ? "Log In" : "Sign Up"}
          </Button>
        </Text>
      </Container>
      {!registrationView ? (
        <Login />
      ) : (
        <Register />
      )}
    </Box>
  );
};

export default Authentication;
