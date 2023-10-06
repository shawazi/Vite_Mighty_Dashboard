import React, { useState } from "react";
import { Container, Text, FormControl, Input, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { provider } from "../../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../redux/actions/userActions";

const Login = () => {
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
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
      });


    console.log("Logged in successfully.");
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
          Login
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
          Log In
        </Button>
        <Button
          variant="primary"
          borderRadius="4px"
          color="white"
          backgroundColor="blue"
          _hover={{
            backgroundColor: "#A7C7E7",
          }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </Container>
    </form>
  );
};

export default Login;
