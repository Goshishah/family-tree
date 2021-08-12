// import React from "react";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import * as Yup from "yup";

// import AppInput from "../../components/AppInput/AppInput";
// import AppButton from "../../components/AppButton/AppButton";
// import { loginAction } from "../../redux/authReducer";
// import { routesPath } from "../../routes/routesConfig";
// import "./login.scss";
// import AppHeader from "../../components/AppHeader/AppHeader";

// const Login = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { isAuthenticated, roles } = useSelector((state) => state.user);
//   history.push(
//     isAuthenticated ? history.push(routesPath.dashbord) : routesPath.login
//   );

//   const formik = useFormik({
//     initialValues: {
//       email: "superadmin@helpme.pk",
//       password: "123",
//     },
//     validationSchema: Yup.object().shape({
//       email: Yup.string()
//         .email("Please enter valid email")
//         .max(320, "Email is too long")
//         .required("Required"),
//       password: Yup.string()
//         .max(200, "Password is too long")
//         .required("Required"),
//     }),
//     onSubmit: (values) => {
//       const { email, password } = values;
//       loginService({ email, password })
//         .then((response) => {
//           console.log(response);
//           const { success, data, message } = response;
//           if (success) {
//             setAuthToken(data.accessToken);
//             dispatch(
//               loginAction({ ...data, isAuthenticated: !!data.accessToken })
//             );
//             history.push(routesPath.dashbord);
//           } else {
//             formik.setFieldError("email", message);
//           }
//         })
//         .catch((error) => {
//           console.log("error.......", error);
//         });
//     },
//   });

//   const handleRegister = () => {
//     history.push(routesPath.register);
//   };

//   const { values, errors, touched, handleChange, handleSubmit } = formik;
//   return (
//     <div className="login-page">
//       <AppHeader />
//       <form className="app-form" onSubmit={(e) => e.preventDefault()}>
//         <div className="form-field">
//           <AppInput
//             name="email"
//             value={values.email}
//             placeholder="Email"
//             error={touched.email && errors.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-field">
//           <AppInput
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={values.password}
//             error={touched.password && errors.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-field">
//           <AppButton onClick={handleSubmit}>Login</AppButton>
//           <AppButton onClick={handleRegister}>Register</AppButton>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { loginService, setAuthToken } from "../../services/authService";
import storageService from "../../services/storageService";
import { loginAction } from "../../redux/authReducer";
import { routesPath } from "../../routes/routesConfig";
import AppLogo from "../../components/AppLogo";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.user);
  history.push(
    isAuthenticated ? history.push(routesPath.dashbord) : routesPath.login
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      error: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter valid email")
        .max(320, "Email is too long.")
        .required("Email is required."),
      password: Yup.string()
        .max(200, "Password is too long.")
        .required("Password is required."),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      loginService({ email, password })
        .then((response) => {
          console.log(response);
          const { success, data, message } = response;
          if (success) {
            setAuthToken(data.token);
            storageService.setItem("user", JSON.stringify(data));
            dispatch(loginAction({ ...data, isAuthenticated: !!data.token }));
            history.push(routesPath.admin);
          } else {
            formik.setFieldError("email", message);
            formik.setErrors({ error: response.message });
          }
        })
        .catch((response) => {
          formik.setErrors({ error: response.message });
        });
    },
  });

  const handleRegister = () => {
    history.push(routesPath.register);
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <AppLogo />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              {errors.error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Incorrect credentials!</AlertTitle>
                  <AlertDescription>{errors.error}</AlertDescription>
                </Alert>
              )}
              <FormControl isInvalid={touched.email && errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="email address"
                    value={values.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {touched.email && errors.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.password && errors.password}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    error={touched.password && errors.password}
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {touched.password && errors.password}
                </FormErrorMessage>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" onClick={handleRegister}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
