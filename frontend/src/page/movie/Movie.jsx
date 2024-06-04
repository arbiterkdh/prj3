import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Movie() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
