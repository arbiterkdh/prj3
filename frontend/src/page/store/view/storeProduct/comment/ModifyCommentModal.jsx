import React, { useState } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function ModifyCommentModal({
  isModifyOpen,
  onModifyClose,
  commentListRefresh,
  commentId,
}) {
  const [commentContent, setCommentContent] = useState("");
  const toast = useToast();
  function handleCommentModify(commentId, commentContent) {
    axios
      .put("/api/store/product/comment/modify", {
        id: commentId,
        content: commentContent,
      })
      .then(() => {
        toast({
          status: "success",
          description: "코멘트 수정 완료",
          position: "bottom",
        });
        commentListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onModifyClose();
      });
  }

  return (
    <>
      <Modal isOpen={isModifyOpen} onClose={onModifyClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>코멘트를 수정하시겠습니까?</ModalHeader>
          <ModalBody>
            <Input
              type={"text"}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => handleCommentModify(commentId, commentContent)}
              >
                확인
              </Button>
              <Button onClick={onModifyClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModifyCommentModal;
