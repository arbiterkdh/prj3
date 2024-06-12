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
} from "@chakra-ui/react";
import React from "react";

function ReadQnAContentModal({
  isQnAContentOpen,
  onQnAContentClose,
  titleQnA,
  contentQnA,
}) {
  return (
    <>
      <Modal isOpen={isQnAContentOpen} onClose={onQnAContentClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titleQnA}</ModalHeader>
          <hr />
          <ModalBody>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea readOnly>{contentQnA}</Textarea>
            </FormControl>
            <hr />
            <FormControl>
              <FormLabel>답변목록</FormLabel>
              {/*<QnACommentAnswerList />*/}
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
    </>
  );
}

export default ReadQnAContentModal;
