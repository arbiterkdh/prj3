import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Stack } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { MovieCommentItem } from "./MovieCommentItem.jsx";

MovieCommentItem.propTypes = { comment: PropTypes.any };

export function MovieCommentList({ movieId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isProcessing) {
      axios.get(`/api/movie/comment/${movieId}`).then((res) => {
        setCommentList(res.data);
      });
    }
  }, [isProcessing]);

  if (commentList.length === 0) {
    return <Box>댓글이 없습니다. 댓글을 써보세요!</Box>;
  }

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
    </Stack>
  );
}
