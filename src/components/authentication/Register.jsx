import React, { useState } from 'react'
import {
    Container,
    FormControl,
    Input,
    Text,
    Button,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const Register = () => {
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
                gap="1em"
                mt="4em"
                textAlign="center"
            >
                <Text>Register</Text>
                <FormControl>
                    <Input placeholder="Email" />
                </FormControl>
                <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" />
                    <Button
                        variant="unstyled"
                        onClick={togglePasswordVisibility}
                        ml="-10"
                    >
                        <ViewIcon boxSize={6} />
                    </Button>
                </FormControl>
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
            </Container>
        </form>
    )
}

export default Register