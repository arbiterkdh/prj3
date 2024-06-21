import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import axios from "axios";
import { QnAComment } from "./QnAComment.jsx";

function ReadQnAContentModal({
  isQnAContentOpen,
  onQnAContentClose,
  titleQnA,
  contentQnA,
  writerQnA,
  idQnA,
}) {
  const Login = useContext(LoginContext);
  const [answerComment, setAnswerComment] = useState("");
  const toast = useToast();

  function handleAddAnswerComment() {
    console.log("answerComment :" + answerComment);
    console.log("idQnA :" + idQnA);
    axios
      .post("/api/store/qna/comment/add", {
        productQnAId: idQnA,
        content: answerComment,
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Modal isOpen={isQnAContentOpen} onClose={onQnAContentClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{titleQnA}</ModalHeader>
        <hr />
        <ModalBody>
          <FormControl>
            <FormLabel>내용</FormLabel>
            <Textarea readOnly resize={"none"} defaultValue={contentQnA} />
          </FormControl>
          <hr />
          <FormControl>
            <FormLabel>답변 내용</FormLabel>
            <QnAComment idQnA={idQnA} />

            {Login.nickName === writerQnA && (
              <>
                <FormLabel>추가 문의글 작성</FormLabel>
                <Flex>
                  <Textarea
                    placeholder={"추가 문의글을 작성하세요"}
                    resize={"none"}
                    onChange={(e) => setAnswerComment(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      handleAddAnswerComment();
                    }}
                  >
                    확인
                  </Button>
                </Flex>
              </>
            )}
            {Login.nickName === "admin" && (
              <>
                <FormLabel>답글 작성</FormLabel>
                <Flex>
                  <Textarea
                    placeholder={"답글을 작성하세요"}
                    resize={"none"}
                    onChange={(e) => setAnswerComment(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      handleAddAnswerComment();
                      console.log("answerComment :" + answerComment);
                      console.log("idQnA :" + idQnA);
                    }}
                  >
                    확인
                  </Button>
                </Flex>
              </>
            )}
          </FormControl>
        </ModalBody>
        <hr />
        <ModalFooter>
          <Flex>
            <Button>확인</Button>
            <Button onClick={onQnAContentClose}>취소</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReadQnAContentModal;
