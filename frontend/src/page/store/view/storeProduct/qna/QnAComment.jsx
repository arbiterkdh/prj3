import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

export function QnAComment({ idQnA, refreshQnAComment }) {
  const [qnAComment, setQnAComment] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/store/qna/comment/read/${idQnA}`)
      .then((res) => {
        setQnAComment(res.data);
      })
      .catch((err) => {});
  }, [idQnA, refreshQnAComment]);

  return (
    <>
      {qnAComment.map((qnAItem, index) => (
        <Box
          key={qnAItem.id}
          p={3}
          mb={2}
          borderRadius="md"
          boxShadow="sm"
          bg={qnAItem.isAdmin ? "red.50" : "white"}
          _dark={{ bg: qnAItem.isAdmin ? "red.900" : "gray.800" }}
          ml={qnAItem.isAdmin ? 4 : 0} // 들여쓰기 적용
        >
          <Text
            color={qnAItem.isAdmin ? "red.500" : "black"}
            _dark={{ color: qnAItem.isAdmin ? "red.300" : "whiteAlpha.900" }}
            fontWeight={qnAItem.isAdmin ? "bold" : "normal"}
          >
            {qnAItem.isAdmin
              ? `관리자: ${qnAItem.content}`
              : `작성자: ${qnAItem.content}`}
          </Text>
        </Box>
      ))}
    </>
  );
}
