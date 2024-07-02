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
  Td,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";
import axios from "axios";
import { QnAComment } from "./QnAComment.jsx";
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

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
  const [isDisabled, setIsDisabled] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setIsDisabled(answerComment.trim() === "");
  }, [answerComment]);

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
        {/*<ModalOverlay />*/}
        <ModalContent
          borderRadius="lg"
          boxShadow="lg"
          _dark={{ bgColor: "#1F3032" }}
        >
          <ModalHeader borderTopRadius="lg" py={4} px={6}>
            {titleQnA}
          </ModalHeader>
          <hr />
          <ModalBody px={6} py={4}>
            <FormControl mb={4}>
              <FormLabel>내용</FormLabel>
              <Textarea
                _dark={{ bgColor: "#1F3032" }}
                readOnly
                resize="none"
                bg="gray.100"
                borderRadius="md"
                p={4}
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
                _dark={{ bgColor: "#1F3032" }}
              >
                <QnAComment
                  idQnA={idQnA}
                  refreshQnAComment={refreshQnAComment}
                />
              </Box>

              {Login.nickName === `${writerQnA}` ||
                (Login.nickName !== "생존코딩" && (
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
                        _dark={{ bgColor: "#1F3032" }}
                      />
                      <ColorButton
                        onClick={() => {
                          handleAddAnswerComment(isAdmin);
                        }}
                        borderRadius="md"
                        boxShadow="md"
                        isDisabled={isDisabled}
                      >
                        확인
                      </ColorButton>
                    </Flex>
                  </>
                ))}
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
                      _dark={{ bgColor: "#1F3032" }}
                    />
                    <ColorButton
                      onClick={() => {
                        handleAddAnswerComment(isAdmin);
                      }}
                      isDisabled={isDisabled}
                    >
                      확인
                    </ColorButton>
                  </Flex>
                </>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter borderBottomRadius="lg" _dark={{ bgColor: "#1F3032" }}>
            <Flex>
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={onQnAContentClose}
                borderRadius={"md"}
              >
                닫기
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Td>
  );
}

export default ReadQnAContentModal;
