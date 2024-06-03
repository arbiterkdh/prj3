import {Box} from "@chakra-ui/react";
import {Navbar} from "../component/Navbar.jsx"
import {Outlet} from "react-router-dom";

export function Home() {
  return <Box>
    <Navbar />
    <Outlet />
  </Box>;
}