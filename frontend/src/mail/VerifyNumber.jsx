import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export function VerifyNumber({ isOpen, onOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이메일 본인인증</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder={"인증번호 입력"} />
        </ModalBody>
        <ModalFooter>
          <Button>확인</Button>
          <Button onClick={() => onClose()}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
