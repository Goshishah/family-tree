import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Routes from "./routes/Routes";
import AppLoader from "./components/AppLoader/AppLoader";
import { verifyService } from "./services/authService";
import storageService from "./services/storageService";
import { loginAction } from "./redux/authReducer";
import { toggleLangAction } from "./redux/generalReducer";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { selectedLang } = useSelector((state) => state.general);

  // useEffect(() => {
  //   try {
  //     require(`./styles-${selectedLang}.css`);
  //   } catch (error) {
  //     require(`./styles-en.css`);
  //   }
  // }, [selectedLang]);

  useEffect(() => {
    const user = storageService.getItem("user");
    verifyService({ ...JSON.parse(user) })
      .then((response) => {
        const { success, data } = response;
        if (success) {
          dispatch(loginAction({ ...data, isAuthenticated: !!data.token }));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    const locale = storageService.getItem("locale") || selectedLang;
    dispatch(toggleLangAction(locale));
  }, [dispatch]);

  if (loading) return <AppLoader />;
  return (
    <ChakraProvider
      theme={extendTheme({
        initialColorMode: "light",
        useSystemColorMode: false,
      })}
    >
      <Routes />
    </ChakraProvider>
  );
}
