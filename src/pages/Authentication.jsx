import React from "react";
import { Box, Center, Text, Input, Button } from "@chakra-ui/react";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../Firebase";


const Authentication = () => {

  const handleGoogleSignIn = () => {
    signInWithRedirect(auth, provider)
  }

  return (
    <>
      <Box w="100%">
        <Center mt="5em">
          <Text display="flex" alignItems="center" flexDir="column" gap=".5em">
            Log In
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button
              variant="primary"
              borderRadius="full"
              color="white"
              bg="black"
            >
              Submit
            </Button>
            <Button
              variant="primary"
              borderRadius="full"
              color="white"
              bg="blue"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
            <Text>Don't have an account? Sign up here.</Text>
          </Text>
        </Center>
      </Box>
    </>
  );
};

export default Authentication;
