import { Box, Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const PromoPagination = ({ pageInfo, eventType }) => {
  const navigate = useNavigate();
  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <Center>
        {pageInfo.prevPageNumber && (
          <>
            <Button onClick={() => navigate(`/promotion/${eventType}?page=1`)}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/promotion/${eventType}?page=${pageInfo.prevPageNumber}`,
                )
              }
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          </>
        )}
        {pageNumbers.map((pageNumber) => (
          <Button
            onClick={() =>
              navigate(`/promotion/${eventType}?page=${pageNumber}`)
            }
            key={pageNumber}
            colorScheme={
              pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
            }
          >
            {pageNumber}
          </Button>
        ))}
        {pageInfo.nextPageNumber && (
          <>
            <Button
              onClick={() =>
                navigate(
                  `/promotion/${eventType}?page=${pageInfo.nextPageNumber}`,
                )
              }
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/promotion/${eventType}?page=${pageInfo.lastPageNumber}`,
                )
              }
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          </>
        )}
      </Center>
    </Box>
  );
};

export default PromoPagination;
