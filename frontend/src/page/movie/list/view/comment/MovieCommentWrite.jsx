import { Box, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export function MovieCommentWrite() {
  const [comment, setComment] = useState("");
  return (
    <Flex>
      <Box flex={1}>
        <Textarea
          placeholder={"댓글을 작성해 보세요"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
    </Flex>
  );
}
