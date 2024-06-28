import { Button } from "@chakra-ui/react";

const ColorButton = (props) => {
  return (
    <Button
      variant="solid"
      color={"white"}
      bgColor={"red.500"}
      _hover={{
        bgColor: "red.600",
      }}
      _dark={{
        bgColor: "red.700",
        _hover: {
          color: "whiteAlpha.900",
          bgColor: "red.600",
        },
      }}
      {...props}
    />
  );
};

export default ColorButton;
