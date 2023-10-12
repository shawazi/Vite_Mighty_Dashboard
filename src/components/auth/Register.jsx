import React, { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { logIn } from "../../redux/actions/userActions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

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
          <Input
            value={userInfo.email}
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleEmail}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup >
            <Input
              value={userInfo.password}
              name="password"
              type={hidePassword ? "password" : "text"}
              placeholder="Password"
              onChange={handlePassword}
            />
            <InputRightElement width="5em">
              <Button onClick={() => setHidePassword(!hidePassword)} variant="primary">
                {hidePassword ? <ViewIcon boxSize={4} /> : <ViewOffIcon boxSize={4} />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          variant="primary"
          color="white"
          border="2px solid white"
          rounded
          borderRadius="full"
          type="submit"
          _hover={{
            opacity: "50%",
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="primary"
          backgroundColor="blue"
          rounded="full"
          color="white"
          maxW="50%"
          _hover={{
            opacity: "0.5",
          }}
        >
          Sign in with Google
        </Button>
      </Container>
    </form>
  );
};

export default Register;
