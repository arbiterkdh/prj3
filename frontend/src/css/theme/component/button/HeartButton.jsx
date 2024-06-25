import { Button } from "@chakra-ui/react";
import AngledButton from "./AngledButton.jsx";

const HeartButton = (props) => {
  return (
    <Button
      variant="outline"
      color={"#ff4357"}
      borderColor={"#ff4357"}
      _hover={{
        bgColor: "#ffe0e2",
      }}
      _dark={{
        color: "#ad303a",
        borderColor: "#ad303a",
        _hover: {
          bgColor: "#b78b8d",
        },
      }}
      {...props}
    />
  );
};

export default HeartButton;
