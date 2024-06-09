import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Oauth() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
