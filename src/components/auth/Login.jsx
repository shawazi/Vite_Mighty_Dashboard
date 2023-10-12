import React, { useState } from "react";
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { logIn } from "../../redux/actions/userActions";
import { provider } from "../../Firebase"

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const [hidePassword, setHidePassword] = useState(true);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = userInfo.email;
        const password = userInfo.password;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
                dispatch(logIn(userData))
                console.log("Logged in successfully.");
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

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                console.log(credential, token, user);
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                };
                dispatch(logIn(userData));
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Container
                borderRadius="5em"
                display="flex"
                flexDir="column"
                gap="1em"
                boxShadow="rgb(38, 57, 77) 0px 20px 30px -10px;"
                mt="7em"
                p="3em"
                alignItems="center"
            >
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input value={userInfo.email}
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        onChange={handleEmail}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input value={userInfo.password}
                        name="password"
                        type={hidePassword ? "password" : "text"}
                        placeholder="Password"
                        onChange={handlePassword} />
                </FormControl>
                <Button
                    variant="primary"
                    color="white"
                    border="2px solid white"
                    rounded
                    borderRadius="full"
                >
                    Log In
                </Button>
                <Button
                    variant="primary"
                    backgroundColor="blue"
                    rounded="full"
                    color="white"
                    maxW="50%"
                    onClick={handleGoogleSignIn}
                >
                    Sign in with Google
                </Button>
            </Container>
        </form>
    );
};

export default Login;
