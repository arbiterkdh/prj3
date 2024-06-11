import { Box, Button, Flex, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function MovieCommentEdit({
  comment,
  setIsEditing,
  isProcessing,
  setIsProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);
  const toast = useToast();

  function handleModifyComment() {
    setIsProcessing(true);
    axios
      .put("/api/movie/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {
        toast({
          status: "success",
          description: "댓글이 수정 되었습니다.",
          position: "bottom",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
        setIsEditing(false);
      });
  }

  return (
    <Flex alignItems={"center"}>
      <Box flex={1}>
        <Textarea
          resize={"none"}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Box>
        <Box>
          <Button onClick={() => setIsEditing(false)}>취소</Button>
        </Box>
        <Box marginTop={-2}>
          <Button
            isLoading={isProcessing}
            onClick={handleModifyComment}
            colorScheme={"blue"}
          >
            수정
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
