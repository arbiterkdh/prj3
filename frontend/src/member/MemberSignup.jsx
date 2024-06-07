import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function MemberSignup() {
  const location = useLocation();

  const [id, setId] = useState("");
  const [email, setEmail] = useState(location.state?.email);
  const [verified, setVerified] = useState(location.state?.verified);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!verified) {
      navigate("/verify");
    }
  }, []);

  function handleSignup() {
    axios
      .post("/api/member/signup", { id, email, nickName, password })
      .then(() => {
        toast({
          status: "success",
          description: "회원가입되었습니다.",
          position: "bottom-right",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: "회원가입중 문제가 발생하였습니다.",
          position: "bottom-right",
        });
      })
      .finally(() => {
        setId("");
        setEmail("");
        setPassword("");
        setPasswordCheck("");
        setNickName("");
      });
  }

  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>아이디</FormLabel>
            <InputGroup>
              <Input value={id} onChange={(e) => setId(e.target.value)} />
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <InputGroup>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드</FormLabel>
            <InputGroup>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드 재확인</FormLabel>
            <InputGroup>
              <Input
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <InputGroup>
              <Input
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Box>
      </Box>
      <Box>
        <Button onClick={handleSignup}>가입</Button>
      </Box>
    </Box>
  );
}
