import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Center, Flex, Stack } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { MovieCommentItem } from "./MovieCommentItem.jsx";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

MovieCommentItem.propTypes = { comment: PropTypes.any };

export function MovieCommentList({ movieId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/movie/comment/${movieId}`, {
          params: {
            page: page,
          },
        })
        .then((res) => {
          setCommentList(res.data.commentList);
          setPageInfo(res.data.pageInfo);
        });
    }
  }, [isProcessing, page]);

  if (commentList.length === 0) {
    return (
      <Box fontWeight={"bold"} fontSize={"large"} mb={12}>
        댓글이 없습니다. 댓글을 써보세요!
      </Box>
    );
  }

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  const clicked = {
    variant: "solid",
    color: "white",
    bgColor: "#ff4357",
    _hover: {
      bgColor: "#ff7889",
    },
    _dark: {
      bgColor: "#ad303a",
      _hover: {
        bgColor: "#a86669",
      },
    },
  };

  return (
    <Stack>
      {commentList.map((comment) => (
        <MovieCommentItem
          comment={comment}
          key={comment.id}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      ))}
      <Center mt={10}>
        <Flex>
          {pageInfo.currentPageNumber > 1 && (
            <Button size={"sm"} onClick={() => setPage(1)}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </Button>
          )}
          {pageInfo.prevPageNumber && (
            <Button
              size={"sm"}
              onClick={() => setPage(pageInfo.prevPageNumber)}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          )}
          {pageNumbers.map((pageNumber) => (
            <Button
              size={"sm"}
              onClick={() => setPage(pageNumber)}
              // colorScheme={
              //   pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
              // }
              sx={pageNumber === pageInfo.currentPageNumber ? clicked : {}}
              key={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
          {pageInfo.nextPageNumber && (
            <Button
              size={"sm"}
              onClick={() => setPage(pageInfo.nextPageNumber)}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          )}
          {pageInfo.currentPageNumber < pageInfo.lastPageNumber && (
            <Button
              size={"sm"}
              onClick={() => setPage(pageInfo.lastPageNumber)}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          )}
        </Flex>
      </Center>
    </Stack>
  );
}
