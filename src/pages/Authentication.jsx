import React, { useState } from "react";
import { Box, Center, Text, Input, Button, Container, FormControl } from "@chakra-ui/react";
import { signInWithPopup, signOut, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../redux/actions/userActions";
import { GoogleAuthProvider } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Authentication = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.userData);

  const [userCreds, setUserCreds] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogInWithFirebase = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const email = userCreds.email;
    const password = userCreds.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(logIn(userData));
        console.log("Logged in");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(logIn(userData));
        // console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(error);
      });
  };

  const handleGoogleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Successfully logged out.");
        dispatch(logOut());
      })
      .catch((error) => {
        console.error("Error: ", error);
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
      {!isLoggedIn ? (
        <>
          <Box w="100%">
            <Center display="flex" flexDirection="column" gap="2.5em" mt="5em">

              <form onSubmit={handleLogInWithFirebase}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDir="column"
                  gap="2.5em"
                  p="1em"
                  boxShadow="0px 3px 5px 0px rgba(0,0,0,0.75)"
                >
                  <Text>Log In</Text>
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
                  <Button
                    variant="primary"
                    borderRadius="full"
                    color="white"
                    bg="black"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
              <Button
                variant="primary"
                borderRadius="full"
                color="white"
                bg="blue"
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </Button>
              <Text display="flex" flexDirection="column" alignItems="center">
                Don't have an account?
                <NavLink to="/register">Register Here</NavLink>
              </Text>
            </Center>
          </Box >
        </>
      ) : (
        <>
          <Container
            maxW="2xl"
            centerContent
            display="flex"
            justifyContent="center"
            mt="15%"
          >
            <p>
              You're currently logged in as {userData?.email}.
            </p>
            <p>
              Would you like to
              log out, {userData?.displayName}?
            </p>
            <Button
              variant="primary"
              backgroundColor="white"
              color="black"
              borderRadius="full"
              mt="2em"
              onClick={handleGoogleSignOut}
            >
              Log Out
            </Button>
          </Container>
        </>
      )}
    </>
  );
};

export default Authentication;
