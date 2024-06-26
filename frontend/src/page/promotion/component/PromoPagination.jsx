import { Box, Button, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const PromoPagination = ({ pageInfo, onLoadMore }) => {
  return (
    <Box mt={4}>
      <Center>
        {pageInfo.currentPageNumber < pageInfo.lastPageNumber && (
          <Button w="100%" onClick={onLoadMore}>
            더보기
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>
        )}
      </Center>
    </Box>
  );
};

export default PromoPagination;
