import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Store() {
  return (
    <Box
      mx={{
        base: 0,
        lg: 500,
      }}
      my={{
        base: 0,
        lg: 200,
      }}
    >
      {/*<Heading>스토어 페이지입니다</Heading>*/}
      {/*<hr />*/}
      <Outlet />
    </Box>
  );
}
