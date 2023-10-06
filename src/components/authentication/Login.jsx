import React, { useState } from "react";
import { Container, FormControl, Input, Text, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form>
        <Container
        maxW="25%"
        centerContent="true"
        display="flex"
        gap="2em"
        mt="4em"
        textAlign="center"
        boxShadow="0px 5px 10px #888888"
        p="1em"
      >
        <Text fontSize="xl" fontFamily="Arial">
          Log In
        </Text>
        <FormControl>
          <Input placeholder="Email" />
        </FormControl>
        <FormControl display="inline-flex" alignItems="center">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <Button
            variant="unstyled"
            onClick={togglePasswordVisibility}
            ml="-10"
          >
            <ViewIcon boxSize={6} />
          </Button>
        </FormControl>
         <Button variant="primary" type="submit" borderRadius="8px" bg="indigo">
          Log In
        </Button>
          <Button variant="primary" rounded="full" bg="blue" color="white">Google Sign In</Button>
      </Container>
    </form>
  );
};

export default Login;
