import { Box, Flex, Textarea, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

export function MovieCommentWrite({ movieId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);

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
      .catch(() => {
        toast({
          status: "error",
          description: "로그인을 해주세요",
          position: "bottom-right",
        });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Flex mb={10}>
      <Box flex={1}>
        <Textarea
          mt={1}
          h={"100%"}
          border={"1px solid #f2efef"}
          bgColor={"#f2efef"}
          _dark={{
            border: "1px solid #2d4c4c",
            bgColor: "#2d4c4c",
          }}
          borderRadius={"10px"}
          resize={"none"}
          placeholder={
            account.isLoggedIn() ? "댓글을 작성 해보세요" : "로그인을 해주세요"
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
      <Box>
        <ColorButton h={"100%"} onClick={handleCommentSubmit}>
          작성
        </ColorButton>
      </Box>
    </Flex>
  );
}
