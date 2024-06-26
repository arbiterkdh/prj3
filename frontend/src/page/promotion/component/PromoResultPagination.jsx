import React from "react";
import { Button, ButtonGroup, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const PromoResultPagination = ({ pageInfo, onPageChange }) => {
  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Center mt={4}>
      <ButtonGroup>
        {pageInfo.currentPageNumber > 1 && (
          <>
            <Button onClick={() => onPageChange(1)}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </Button>
            <Button
              onClick={() => onPageChange(pageInfo.currentPageNumber - 1)}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          </>
        )}
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            colorScheme={
              pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
            }
          >
            {pageNumber}
          </Button>
        ))}
        {pageNumbers.length > 1 &&
          pageInfo.currentPageNumber < pageInfo.lastPageNumber && (
            <>
              <Button
                onClick={() => onPageChange(pageInfo.currentPageNumber + 1)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
              <Button onClick={() => onPageChange(pageInfo.lastPageNumber)}>
                <FontAwesomeIcon icon={faAnglesRight} />
              </Button>
            </>
          )}
      </ButtonGroup>
    </Center>
  );
};

export default PromoResultPagination;
