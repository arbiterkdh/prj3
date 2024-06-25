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
  Td,
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
  const [isAdmin, setIsAdmin] = useState(null);
  const [refreshQnAComment, setRefreshQnAComment] = useState(0);
  const toast = useToast();

  function handleAddAnswerComment(isAdmin) {
    console.log("answerComment :" + answerComment);
    console.log("idQnA :" + idQnA);
    console.log("isAdmin :" + isAdmin);

    axios
      .post("/api/store/qna/comment/add", {
        productQnAId: idQnA,
        content: answerComment,
        isAdmin,
      })
      .then(() => {
        toast({
          status: "success",
          description: "작성 완료",
          position: "bottom",
        });
        setRefreshQnAComment(refreshQnAComment + 1);
      })
      .catch(() => {})
      .finally(() => {
        setAnswerComment("");
      });
  }

  return (
    <Td>
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
              <QnAComment idQnA={idQnA} refreshQnAComment={refreshQnAComment} />

              {Login.nickName === writerQnA && (
                <>
                  <FormLabel>추가 문의글 작성</FormLabel>
                  <Flex>
                    <Textarea
                      placeholder={"추가 문의글을 작성하세요"}
                      resize={"none"}
                      value={answerComment}
                      onChange={(e) => {
                        setAnswerComment(e.target.value);
                        setIsAdmin(false);
                      }}
                    />
                    <Button
                      onClick={() => {
                        handleAddAnswerComment(isAdmin);
                      }}
                    >
                      확인
                    </Button>
                  </Flex>
                </>
              )}
              {Login.nickName === "생존코딩" && (
                <>
                  <FormLabel>답글 작성</FormLabel>
                  <Flex>
                    <Textarea
                      placeholder={"답글을 작성하세요"}
                      resize={"none"}
                      value={answerComment}
                      onChange={(e) => {
                        setAnswerComment(e.target.value);
                        setIsAdmin(true);
                      }}
                    />
                    <Button
                      onClick={() => {
                        handleAddAnswerComment(isAdmin);
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
              <Button onClick={onQnAContentClose}>확인</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Td>
  );
}

export default ReadQnAContentModal;
