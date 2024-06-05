import {
  Button,
  Heading,
  Input,
  InputGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyNumber } from "./VerifyNumber.jsx";

export function MailVerify() {
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  function handleClick() {
    axios
      .post("/api/mail", { address, title, message })
      .then(() => {
        toast({
          status: "success",
          description: "전송되었습니다, 이메일을 확인해주세요.",
          position: "bottom-right",
        });
        onOpen();
      })
      .catch()
      .finally(() => {
        setAddress("");
        setTitle("");
        setMessage("");
      });
  }

  return (
    <>
      <Heading>메일 발송</Heading>
      <InputGroup>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={"이메일 주소"}
        />
        <Button onClick={handleClick}>인증번호 요청</Button>
      </InputGroup>
      <VerifyNumber isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
}
