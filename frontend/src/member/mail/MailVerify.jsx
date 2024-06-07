import {
  Button,
  Center,
  Heading,
  Input,
  InputGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { VerifyNumber } from "./VerifyNumber.jsx";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";

export function MailVerify() {
  const [address, setAddress] = useState("");
  const [verifyNumber, setVerifyNumber] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [verifiedAddress, setVerifiedAddress] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  function handleClick() {
    axios
      .post("/api/mail/check", { address })
      .then((res) => {
        onOpen();
        setIsSending(true);
        setIsRunning(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast({
            status: "warning",
            description: "이미 사용중인 이메일입니다.",
            position: "bottom-right",
          });
        }
        return;
      });

    axios
      .post("/api/mail", { address })
      .then((res) => {
        toast({
          status: "success",
          description:
            "이메일로 인증번호가 전송되었습니다, 이메일을 확인해주세요.",
          position: "bottom-right",
        });
        setVerifyNumber(res.data.verifyNumber);
        setVerifiedAddress(address);
      })
      .catch()
      .finally(() => {
        setAddress("");
        setIsSending(false);
      });
  }

  return (
    <Center>
      <CenterBox mb={48}>
        <Heading>이메일 본인인증</Heading>
        <InputGroup>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={"이메일 주소"}
          />
          <Button onClick={handleClick}>인증번호 요청</Button>
        </InputGroup>
        <VerifyNumber
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          verifyNumber={verifyNumber}
          setVerifyNumber={setVerifyNumber}
          isSending={isSending}
          verifiedAddress={verifiedAddress}
          setVerifiedAddress={setVerifiedAddress}
        />
      </CenterBox>
    </Center>
  );
}