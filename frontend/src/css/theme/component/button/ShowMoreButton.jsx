import { Box, Button } from "@chakra-ui/react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowMoreButton = ({ buttonOnclick }) => {
  return (
    <Box display="flex" justifyContent="flex-end" width="100%">
      <Button
        onClick={buttonOnclick}
        size={"sm"}
        border={"2px solid #FF4357"}
        _hover={{ bg: "red.500", color: "white" }}
        borderRadius={"20px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        _dark={{
          _hover: { bg: "red.800" },
        }}
      >
        <span style={{ marginRight: "8px" }}>더보기</span>
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Box>
  );
};

export default ShowMoreButton;
