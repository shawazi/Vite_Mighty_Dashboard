import { React, useState } from "react";
import {
    Box,
    Container,
    Text,
    Input,
    Button,
    FormControl,
} from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/actions/userActions";

const Register = () => {
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // const userData = useSelector((state) => state.user.userData);

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSignUpWithFirebase = (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = userCreds.email;
        const password = userCreds.password;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                };
                dispatch(logIn(userData));
                console.log("Successful account creation and logged in.");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserCreds((prevUserCred) => ({
            ...prevUserCred,
            [name]: value,
        }));
        // console.log(userCreds);
    };
    return (
        <>
            <Box w="100%">
                <form onSubmit={handleSignUpWithFirebase}>
                    <Container
                        centerContent
                        display="flex"
                        flexDirection="column"
                        gap="2.5em"
                        mt="5em"
                        boxShadow="0px 3px 5px 0px rgba(0,0,0,0.75)"
                        padding="1em"
                    >
                        <Text>Register</Text>
                        <FormControl>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={userCreds.email}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={userCreds.password}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={userCreds.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <Button
                            variant="primary"
                            bg="white"
                            color="black"
                            borderRadius="full"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </Container>
                </form>
            </Box>
        </>
    );
};

export default Register;
