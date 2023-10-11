import React from "react";
import { Container, FormControl, Input, Button } from "@chakra-ui/react";

const Login = () => {
    return (
        <form>
            <Container
                maxW="2xl"
                centerContent
                display="flex"
                flexDirection="column"
                gap="1em"
            >
                <FormControl display="flex" flexDirection="column" gap="1em">
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                </FormControl>
                <Button variant="primary" rounded="full" border="2px solid white">
                    Log In
                </Button>
                <Button variant="primary" rounded="full" backgroundColor="blue" color="white">
                    Sign in with Google
                </Button>
            </Container>
        </form>
    );
};

export default Login;
