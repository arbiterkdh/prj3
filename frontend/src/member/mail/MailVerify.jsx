import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { VerifyNumber } from "./VerifyNumber.jsx";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";

export function MailVerify() {
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [domain, setDomain] = useState("");
  const [verifyNumber, setVerifyNumber] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [res, setRes] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    if (selected !== "") {
      setDomain(selected);
    } else {
      setDomain("");
    }
  }, [selected]);

  function handleClick() {
    axios
      .post("/api/mail/check", { address: address + "@" + domain })
      .then((res) => {
        setRes(200);
        onOpen();
        setIsSending(true);
        setIsRunning(true);
      })
      .catch((err) => {
        setRes(400);
        if (err.response.status === 400) {
          toast({
            status: "warning",
            description: "잘못된 이메일 양식입니다.",
            position: "bottom-right",
          });
        }
        if (err.response.status === 409) {
          toast({
            status: "warning",
            description: "이미 사용중인 이메일입니다.",
            position: "bottom-right",
          });
        }
      });

    if (res === 400) return;

    axios
      .post("/api/mail", { address: address + "@" + domain })
      .then((res) => {
        toast({
          status: "success",
          description:
            "이메일로 인증번호가 전송되었습니다, 이메일을 확인해주세요.",
          position: "bottom-right",
        });
        setVerifyNumber(res.data.verifyNumber);
        setVerifiedEmail(address + "@" + domain);
      })
      .catch()
      .finally(() => {
        setAddress("");
        setIsSending(false);
        setRes(0);
      });
  }

  return (
    <Center>
      <CenterBox mb={48}>
        <Heading>이메일 본인인증</Heading>
        <GapFlex alignItems={"center"}>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value.trim())}
            placeholder={"이메일 주소"}
          />
          <Box fontSize={"2xl"}>@</Box>
          <Select
            border={"1px solid black"}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            <option value="">직접 입력</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="gmail.com">gmail.com</option>
            <option value="kakao.com">kakao.com</option>
            <option value="nate.com">nate.com</option>
            <option value="hotmail.com">hotmail.com</option>
          </Select>
          <Input
            isDisabled={selected !== ""}
            value={domain}
            placeholder={"직접 입력"}
            onChange={(e) => {
              setDomain(e.target.value);
            }}
          />
          <Button w={"40%"} onClick={handleClick}>
            인증번호 요청
          </Button>
        </GapFlex>
        <VerifyNumber
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          verifyNumber={verifyNumber}
          setVerifyNumber={setVerifyNumber}
          isSending={isSending}
          verifiedAddress={verifiedEmail}
          setVerifiedAddress={setVerifiedEmail}
        />
      </CenterBox>
    </Center>
  );
}
