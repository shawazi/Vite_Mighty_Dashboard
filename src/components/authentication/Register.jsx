import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, FormControl, Text, Input, Button } from '@chakra-ui/react';
import { ViewIcon } from "@chakra-ui/icons"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { logIn } from "../../redux/actions/userActions"

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const [hidePassword, setHidePassword] = useState(true);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userData = useSelector((state) => state.user.userData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInfo);
        const auth = getAuth();
        const { email, password } = userInfo
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }
                dispatch(logIn(userData))
                console.log("Logged in!", userData)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
            });

    };

    const handleEmail = (e) => {
        setUserInfo((prev) => ({
            ...prev,
            email: e.target.value,
        }));
    };

    const handlePassword = (e) => {
        setUserInfo((prev) => ({
            ...prev,
            password: e.target.value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Container
                centerContent
                display="flex"
                flexDirection="column"
                gap="1.5em"
                boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
                p="1em"
                mt="4em"
            >
                <Text
                    fontFamily="cursive"
                    fontSize={{
                        base: "2xl",
                        sm: "3xl",
                    }}
                    color="white"
                    fontWeight="bold"
                >
                    Register
                </Text>
                <FormControl>
                    <Input
                        value={userInfo.email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleEmail}
                    />
                </FormControl>
                <FormControl display="inline-flex" alignItems="center">
                    <Input
                        value={userInfo.password}
                        name="password"
                        type={hidePassword ? "password" : "text"}
                        placeholder="Password"
                        onChange={handlePassword}
                    />

                    <Button
                        variant="primary"
                        onClick={() => setHidePassword(!hidePassword)}
                        ml="-14"
                    >
                        <ViewIcon boxSize={6} />
                    </Button>
                </FormControl>

                <Button
                    variant="primary"
                    rounded="md"
                    color="white"
                    bg="black"
                    _hover={{
                        bg: "#A7C7E7",
                    }}
                    type="submit"
                >
                    Sign up
                </Button>
            </Container>
        </form>
    )
}

export default Register