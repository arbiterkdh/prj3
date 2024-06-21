import { useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";

export function QnAComment({ idQnA }) {
  const [qnAComment, setQnAComment] = useState({});
  useEffect(() => {
    axios
      .get(`/api/store/qna/comment/read/${idQnA}`)
      .then((res) => {
        setQnAComment(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, [idQnA]);

  // if (qnAComment == null) {
  //   return <Spinner />;
  // }
  return <Text>{qnAComment.content}</Text>;
}
