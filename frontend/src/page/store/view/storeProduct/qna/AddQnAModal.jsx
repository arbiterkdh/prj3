import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

function AddQnAModal({
  isQnAOpen,
  onQnAClose,
  productId,
  listQnARefresh,
  Login,
}) {
  const [titleQnA, setTitleQnA] = useState("");
  const [contentQnA, setContentQnA] = useState("");
  const toast = useToast();

  function handleQnAAdd(title, content) {
    axios
      .post("/api/store/product/qna/add", {
        productId,
        writer: Login.nickName,
        title: title,
        content: content,
      })
      .then(() => {
        toast({
          status: "success",
          description: "작성 완료",
          position: "bottom-right",
        });
        setTitleQnA("");
        setContentQnA("");
        onQnAClose();
        listQnARefresh();
      })
      .catch((err) => {
        console.error("Failed to add QnA:", err);
      });
  }

  return (
    <>
      <Modal isOpen={isQnAOpen} onClose={onQnAClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>문의글 작성</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>제목</FormLabel>
              <Input
                type={"text"}
                placeholder={"제목을 작성해주세요"}
                onChange={(e) => setTitleQnA(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea
                resize={"none"}
                placeholder={"내용을 작성해주세요"}
                onChange={(e) => setContentQnA(e.target.value)}
              ></Textarea>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button onClick={() => handleQnAAdd(titleQnA, contentQnA)}>
                확인
              </Button>
              <Button onClick={onQnAClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddQnAModal;
