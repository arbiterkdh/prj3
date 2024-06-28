import { Button } from "@chakra-ui/react";

const ColorButton = (props) => {
  return (
    <Button
      variant="solid"
      color={"white"}
      bgColor={"red.500"}
      _hover={{
        color: "red.500",
        bgColor: "whiteAlpha.200",
        border: "3px solid",
      }}
      _dark={{
        bgColor: "red.700",
        _hover: {
          bgColor: "#a86669",
        },
      }}
      {...props}
    />
  );
};

export default ColorButton;
