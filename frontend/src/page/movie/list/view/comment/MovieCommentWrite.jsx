import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function MovieCommentWrite({ movieId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .post(`/api/movie/comment/add`, {
        movieId: movieId,
        comment: comment,
      })
      .then(() => {
        setComment("");
      })
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Flex mb={10}>
      <Box flex={1}>
        <Textarea
          border={"1px solid black"}
          resize={"none"}
          placeholder={"댓글을 작성해 보세요"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
      <Box>
        <Button colorScheme={"blue"} h={"100%"} onClick={handleCommentSubmit}>
          전송
        </Button>
      </Box>
    </Flex>
  );
}
