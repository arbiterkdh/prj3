import { Button, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

const PromoPagination = ({ pageInfo, eventType }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageNumbers = Array.from(
    { length: pageInfo.rightPageNumber - pageInfo.leftPageNumber + 1 },
    (_, i) => pageInfo.leftPageNumber + i,
  );

  return (
    <Center mt={4}>
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
          key={pageNumber}
          onClick={() => navigate(`/promotion/${eventType}?page=${pageNumber}`)}
          isActive={pageNumber === parseInt(searchParams.get("page"), 10)}
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
  );
};

export default PromoPagination;
