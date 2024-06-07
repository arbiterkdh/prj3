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
import GapFlex from "../css/theme/component/flex/GapFlex.jsx";

export function VerifyNumber({
  isOpen,
  onOpen,
  onClose,
  isRunning,
  setIsRunning,
}) {
  const [remainTime, setRemainTime] = useState(3 * 60 * 1000);
  const [verifyNumber, setVerifyNumber] = useState(null);

  let minutes = Math.floor(remainTime / 1000 / 60);
  let seconds = Math.floor((remainTime / 1000) % 60);
  let message = minutes + " : " + seconds + " 남음.";
  let isExpired = minutes <= 0 && seconds <= 0;

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setRemainTime((t) => t - 1000);
      }, 1000);
      if (remainTime <= 0) {
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  function handleCheckVerifyNumber() {}

  if (minutes <= 0) {
    minutes = "0";
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else if (seconds <= 0) {
    seconds = "00";
  }
  if (remainTime <= 0) {
    message = "만료됨.";
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsRunning(false);
        setRemainTime(3 * 60 * 1000);
        onClose();
      }}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이메일 본인인증</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GapFlex>
            <InputGroup>
              <Input placeholder={"인증번호 입력"} />
              <InputRightElement mr={1}>
                {isExpired ? <Box>만료됨.</Box> : <Box>{message}</Box>}
              </InputRightElement>
            </InputGroup>
            <Button onClick={handleCheckVerifyNumber} isDisabled={isExpired}>
              입력
            </Button>
          </GapFlex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
