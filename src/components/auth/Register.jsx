import React, { useState } from "react";
import {
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { logIn } from "../../redux/actions/userActions";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [hidePassword, setHidePassword] = useState(true);

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

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
    const auth = getAuth();
    const { email, password } = userInfo;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(logIn(userData));
        console.log("Logged in!", userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
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
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        maxW="2xl"
        centerContent
        boxShadow="rgb(38, 57, 77) 0px 20px 30px -10px;"
        display="flex"
        flexDirection="column"
        gap="1em"
        fontFamily="Comic Sans MS"
        p="5em"
        borderRadius="11em"
      >
        <Text>Register</Text>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email Address"
            value={userInfo.email}
            name="email"
            type="email"
            onChange={handleEmail}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter Password"
              value={userInfo.password}
              name="password"
              type={hidePassword ? "password" : "text"}
              onChange={handlePassword}
            />
            <InputRightAddon
              width="16%"
              display="flex"
              justifyContent="center"
              bg="transparent"
            >
              <Button
                variant="primary"
                bg="transparent"
                onClick={() => {
                  setHidePassword(!hidePassword);
                }}
              >
                <ViewIcon boxSize={6} />
              </Button>
            </InputRightAddon>
          </InputGroup>
        </FormControl>
        <Button
          variant="primary"
          borderRadius="full"
          border="2px solid white"
          type="submit"
        >
          Register
        </Button>
        <Button
          variant="primary"
          backgroundColor="blue"
          color="white"
          rounded="full"
          onClick={(...args) => console.log("onClick", args)}
        >
          Sign in with Google
        </Button>
      </Container>
    </form>
  );
};

export default Register;
