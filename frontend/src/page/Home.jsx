import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import { Navbar } from "../component/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon as emptyMoon,
  faSun as emptySun,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMoon as fullMoon,
  faSun as fullSun,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function Home() {
  const { toggleColorMode, colorMode } = useColorMode();
  const [mode, setMode] = useState(false);
  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      <IconButton
        aria-label={"toggle theme"}
        rounded={"full"}
        size={"md"}
        position={"fixed"}
        zIndex={1}
        bottom={2}
        right={2}
        onClick={toggleColorMode}
        onMouseEnter={() => setMode(true)}
        onMouseLeave={() => setMode(false)}
        icon={
          colorMode === "dark" ? (
            <Box>
              {mode && <FontAwesomeIcon icon={emptyMoon} />}
              {mode || <FontAwesomeIcon icon={fullMoon} />}
            </Box>
          ) : (
            <Box>
              {mode && <FontAwesomeIcon icon={fullSun} />}
              {mode || <FontAwesomeIcon icon={emptySun} />}
            </Box>
          )
        }
      />
    </Box>
  );
}
