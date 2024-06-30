import {
  Box,
  Button,
  Divider,
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
  onQnAContentClose,
  isQnAContentOpen,
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
          position: "bottom-right",
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
        <ModalContent borderRadius="lg" boxShadow="lg">
          <ModalHeader
            bg="blue.500"
            color="white"
            borderTopRadius="lg"
            py={4}
            px={6}
          >
            {titleQnA}
          </ModalHeader>
          <hr />
          <ModalBody px={6} py={4}>
            <FormControl mb={4}>
              <FormLabel>내용</FormLabel>
              <Textarea
                readOnly
                resize="none"
                bg="gray.100"
                borderRadius="md"
                p={4}
                _dark={{ bg: "gray.700" }}
                defaultValue={contentQnA}
              />
            </FormControl>
            <Divider mb={4} />
            <FormControl>
              <FormLabel>답변 내용</FormLabel>
              <Box
                mb={4}
                p={2}
                bg="gray.50"
                borderRadius="md"
                _dark={{ bg: "gray.800" }}
              >
                <QnAComment
                  idQnA={idQnA}
                  refreshQnAComment={refreshQnAComment}
                />
              </Box>

              {Login.nickName === `${writerQnA}` && (
                <>
                  <FormLabel>추가 문의글 작성</FormLabel>
                  <Flex mb={4} align="center">
                    <Textarea
                      placeholder={"추가 문의글을 작성하세요"}
                      resize={"none"}
                      value={answerComment}
                      onChange={(e) => {
                        setAnswerComment(e.target.value);
                        setIsAdmin(false);
                      }}
                      mr={2}
                      bg="white"
                      borderRadius="md"
                      p={4}
                      _dark={{ bg: "gray.700" }}
                    />
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        handleAddAnswerComment(isAdmin);
                      }}
                      borderRadius="md"
                      boxShadow="md"
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
                      mr={2}
                      bg="white"
                      borderRadius="md"
                      p={4}
                      _dark={{ bg: "gray.700" }}
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
          <ModalFooter
            bg="gray.100"
            borderBottomRadius="lg"
            _dark={{ bg: "gray.700" }}
          >
            <Flex>
              <Button
                colorScheme="gray"
                onClick={onQnAContentClose}
                borderRadius={"md"}
              >
                확인
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Td>
  );
}

export default ReadQnAContentModal;
