import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes/Routes";
import AppLoader from "./components/AppLoader/AppLoader";
import { verifyService } from "./services/authService";
import { loginAction } from "./redux/authReducer";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { selectedLang } = useSelector((state) => state.general);

  useEffect(() => {
    try {
      require(`./styles-${selectedLang}.css`);
    } catch (error) {
      require(`./styles-en.css`);
    }
  }, [selectedLang]);

  useEffect(() => {
    verifyService()
      .then((response) => {
        const { success, data } = response;
        if (success) {
          dispatch(loginAction({ ...data, isAuthenticated: true }));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return <AppLoader />;
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
}
