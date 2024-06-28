import { Button } from "@chakra-ui/react";

const HeartButton = (props) => {
  return (
    <Button
      fontSize={"20px"}
      variant="custom"
      color={"red.500"}
      _hover={{
        color: "red.700",
        fontSize: "22px",
      }}
      _dark={{
        color: "red.500",
        _hover: {
          color: "red.400",
        },
      }}
      {...props}
    />
  );
};

export default HeartButton;
