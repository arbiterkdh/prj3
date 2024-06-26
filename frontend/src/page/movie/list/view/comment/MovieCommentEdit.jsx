import { Box, Button, Flex, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

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
          position: "bottom-right",
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
      <Box p={2} flex={1}>
        <Textarea
          resize={"none"}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          bgColor={"dimgray"}
          color={"white"}
          _hover={{
            bgColor: "gray",
          }}
          onClick={() => setIsEditing(false)}
        >
          취소
        </Button>
        <ColorButton isLoading={isProcessing} onClick={handleModifyComment}>
          수정
        </ColorButton>
      </Box>
    </Flex>
  );
}
