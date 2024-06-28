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

function DeleteCommentModal({
  isDeleteOpen,
  onDeleteClose,
  commentListRefresh,
  commentId,
}) {
  const toast = useToast();
  function handleCommentDelete(commentId) {
    axios
      .delete(`/api/store/product/comment/delete/${commentId}`)
      .then(() => {
        toast({
          status: "success",
          description: "코멘트 삭제 완료",
          position: "bottom-right",
        });
        commentListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onDeleteClose();
      });
  }

  return (
    <>
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 알림</ModalHeader>
          <ModalBody>코멘트 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => {
                  handleCommentDelete(commentId);
                }}
              >
                확인
              </Button>
              <Button onClick={onDeleteClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteCommentModal;
