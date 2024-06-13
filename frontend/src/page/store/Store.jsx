import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Store() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
