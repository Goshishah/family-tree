import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Select,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { logoutAction } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { logoutService, removeAuthToken } from "../../services/authService";
import { routesPath } from "../../routes/routesConfig";
import avatar from "../../content/imgs/avatar.png";

import languages from "../../data/languages.json";

import "./app-header.scss";
import { toggleLangAction } from "../../redux/generalReducer";
import AppLoader from "../AppLoader/AppLoader";
import AppLogo from "../AppLogo";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const LangSelect = () => {
  const dispatch = useDispatch();
  return (
    <Select
      variant="outline"
      placeholder="Select your lanaguage"
      m="0 15px 0 15px"
      onChange={({ target }) => {
        dispatch(toggleLangAction(target.value));
      }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </Select>
  );
};

const UnauthenticatedHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <AppLogo clickable />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Bismillah />
          <Flex alignItems={"center"}>
            <LangSelect />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

const AuthenticatedHeader = ({ username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutService({ email: "" })
      .then((response) => {
        const { success } = response;
        if (success) {
          dispatch(logoutAction());
          removeAuthToken();
          history.push(routesPath.default);
        }
      })
      .catch((error) => {
        console.log("error.......", error);
      });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <AppLogo clickable />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Bismillah />
          <Flex alignItems={"center"}>
            <LangSelect />
            <Menu>
              <Button
                variant={"solid"}
                size={"sm"}
                mr={4}
                style={{ boxShadow: "none" }}
                _active={{ background: "transparent" }}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.100", "gray.900"),
                }}
              >
                {username}
              </Button>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

const Bismillah = () => {
  return <div>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>;
};
const AppHeader = () => {
  const { username, isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? (
    <AuthenticatedHeader username={username} />
  ) : (
    <UnauthenticatedHeader />
  );
};
export default AppHeader;
