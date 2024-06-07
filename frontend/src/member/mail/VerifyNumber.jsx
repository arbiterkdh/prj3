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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function VerifyNumber({
  isOpen,
  onOpen,
  onClose,
  isRunning,
  setIsRunning,
  verifyNumber,
  setVerifyNumber,
  isSending,
}) {
  const [canSignup, setCanSignup] = useState(false);
  const [remainTime, setRemainTime] = useState(3 * 60 * 1000);
  const [inputNumber, setInputNumber] = useState(0);
  const [count, setCount] = useState(5);

  const toast = useToast();
  const navigate = useNavigate();

  let minutes = Math.floor(remainTime / 1000 / 60);
  let seconds = Math.floor((remainTime / 1000) % 60);
  let message = minutes + " : " + seconds + " 남음.";
  let isExpired = (minutes <= 0 && seconds <= 0) || count === 0;

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

  function handleCheckVerifyNumber() {
    if (count === 0) {
      toast({
        status: "error",
        description: "인증시도 횟수가 초과되었습니다, 다시 인증해주세요.",
        position: "bottom-right",
      });
      onClose();
    }
    if (inputNumber == verifyNumber) {
      axios.delete(`/api/mail/delete/${verifyNumber}`).then(() => {
        toast({
          status: "success",
          description: "인증되었습니다.",
          position: "bottom-right",
        });
        onClose();
        navigate("/signup");
      });
    } else {
      setCount(count - 1);
      toast({
        status: "warning",
        description: `인증번호가 틀립니다. 남은 횟수 ${count}회`,
        position: "bottom-right",
      });
    }
  }

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
        onClose();
        setIsRunning(false);
        setRemainTime(3 * 60 * 1000);
        setCount(5);
      }}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이메일 본인인증</ModalHeader>
        <ModalCloseButton />
        {isSending ? (
          <ModalBody>
            <Spinner size={"xl"} />
          </ModalBody>
        ) : (
          <ModalBody>
            <GapFlex>
              <InputGroup>
                <Input
                  value={inputNumber}
                  placeholder={"인증번호 입력"}
                  onChange={(e) => setInputNumber(e.target.value)}
                />
                <InputRightElement mr={1} w={"50px"}>
                  {isExpired ? <Box>만료됨.</Box> : <Box>{message}</Box>}
                </InputRightElement>
              </InputGroup>
              <Button onClick={handleCheckVerifyNumber} isDisabled={isExpired}>
                입력
              </Button>
            </GapFlex>
          </ModalBody>
        )}
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
