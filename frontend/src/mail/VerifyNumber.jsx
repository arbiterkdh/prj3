import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function VerifyNumber({ isOpen, onOpen, onClose }) {
  const [remainTime, setRemainTime] = useState(3 * 60 * 1000);

  let minutes = Math.floor(remainTime / 1000 / 60);
  let seconds = Math.floor((remainTime / 1000) % 60);

  if (minutes <= 0) {
    minutes = "0";
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else if (seconds <= 0) {
    seconds = "00";
  }
  useEffect(() => {
    if (onOpen) {
      const timer = setInterval(() => {
        setRemainTime((t) => t - 1000);
      }, 1000);
      if (remainTime <= 0) {
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }
    if (onClose) {
      setRemainTime(3 * 60 * 1000);
    }
  }, [remainTime]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이메일 본인인증</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input placeholder={"인증번호 입력"} />
            <InputRightElement mr={1}>
              {minutes <= 0 && seconds <= 0 ? (
                <Box>만료됨.</Box>
              ) : (
                <Box>
                  {minutes}:{seconds}
                </Box>
              )}
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button>확인</Button>
          <Button onClick={() => onClose()}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
