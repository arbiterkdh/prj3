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
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

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
              <ColorButton
                onClick={() => {
                  handleCommentDelete(commentId);
                }}
              >
                확인
              </ColorButton>
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={onDeleteClose}
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

export default DeleteCommentModal;
