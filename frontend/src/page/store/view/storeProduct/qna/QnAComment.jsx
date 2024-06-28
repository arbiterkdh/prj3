import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
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
        <Text
          key={qnAItem.id}
          color={qnAItem.isAdmin ? "red" : "black"}
          _dark={{ color: qnAItem.isAdmin ? "red" : "white" }}
        >
          {index !== 0 && qnAItem.isAdmin && "\u00A0\u00A0"}
          {qnAItem.isAdmin
            ? `관리자: ${qnAItem.content}`
            : `작성자: ${qnAItem.content}`}
        </Text>
      ))}
    </>
  );
}
