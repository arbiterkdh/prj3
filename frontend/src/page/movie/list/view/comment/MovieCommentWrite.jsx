import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function MovieCommentWrite({ movieId }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmit() {
    axios.post(`/api/movie/comment/add`, {
      movieId: movieId,
      comment: comment,
    });
  }

  return (
    <Flex>
      <Box flex={1}>
        <Textarea
          placeholder={"댓글을 작성해 보세요"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
      <Box>
        <Button h={"100%"} onClick={handleCommentSubmit}>
          전송
        </Button>
      </Box>
    </Flex>
  );
}
