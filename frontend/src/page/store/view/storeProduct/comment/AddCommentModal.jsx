import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function AddCommentModal({
  isAddOpen,
  onAddClose,
  productId,
  commentContent,
  Login,
  commentListRefresh,
}) {
  const toast = useToast();
  function handleCommentAdd(id, commentContent) {
    axios
      .post("/api/store/product/comment/add", {
        productId: id,
        content: commentContent,
        writer: Login.nickName,
      })
      .then(() => {
        toast({
          status: "success",
          description: "한줄평 작성 성공",
          position: "bottom",
        });
        commentListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onAddClose();
      });
  }

  return (
    <>
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>등록알림</ModalHeader>
          <ModalBody>코멘트를 작성하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => handleCommentAdd(productId, commentContent)}
              >
                확인
              </Button>
              <Button onClick={onAddClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCommentModal;
