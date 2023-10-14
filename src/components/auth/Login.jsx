import React, { useState } from "react";
import {
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightAddon,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions/userActions";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { provider } from "../../Firebase";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();

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
          photoURL: user.photoURL,
        };
        dispatch(logIn(userData));
        console.log("Logged in successfully.");
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
        display="flex"
        gap="1.5em"
        direction="column"
        boxShadow="rgb(38, 57, 77) 0px 20px 30px -10px;"
        padding="4em"
        rounded="5em"
        mt="5em"
        fontFamily="Comic Sans MS"
      >
         <Text fontSize="150%">Login</Text>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email"
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
              display="flex"
              width="15%"
              justifyContent="center"
              bg="transparent"
            >
              <Button
                variant="primary"
                onClick={() => setHidePassword(!hidePassword)}
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
          color="white"
          _hover={{ opacity: "50%" }}
          type="submit"
        >
          Log In
        </Button>
        <Button
          variant="primary"
          bg="blue"
          rounded="full"
          color="white"
          _hover={{ opacity: "50%" }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </Container>
    </form>
  );
};

export default Login;
