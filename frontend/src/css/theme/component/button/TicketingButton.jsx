import { Button } from "@chakra-ui/react";

const TicketingButton = (props) => {
  return (
    <Button
      variant="solid"
      color={"white"}
      bgColor={"#ff4357"}
      _hover={{
        bgColor: "#ff7889",
      }}
      _dark={{
        bgColor: "#ad303a",
        _hover: {
          bgColor: "#a86669",
        },
      }}
      {...props}
    />
  );
};

export default TicketingButton;
