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
import React, { useEffect, useState } from "react";
import axios from "axios";
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

function AddQnAModal({
  isQnAOpen,
  onQnAClose,
  productId,
  listQnARefresh,
  Login,
}) {
  const [titleQnA, setTitleQnA] = useState("");
  const [contentQnA, setContentQnA] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // 제목과 내용이 모두 비어있지 않은 경우에만 버튼을 활성화
    setIsDisabled(titleQnA.trim() === "" || contentQnA.trim() === "");
  }, [titleQnA, contentQnA]);

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
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>문의글 작성</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>제목</FormLabel>
              <Input
                type={"text"}
                placeholder={"제목을 작성해주세요"}
                value={titleQnA}
                onChange={(e) => setTitleQnA(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea
                resize={"none"}
                placeholder={"내용을 작성해주세요"}
                value={contentQnA}
                onChange={(e) => setContentQnA(e.target.value)}
              ></Textarea>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <ColorButton
                onClick={() => handleQnAAdd(titleQnA, contentQnA)}
                isDisabled={isDisabled}
              >
                확인
              </ColorButton>
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={onQnAClose}
              >
                취소
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddQnAModal;
