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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  function handleSignup() {
    axios
      .post("/api/member/signup", { email, password })
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
        setEmail("");
        setPassword("");
      });
  }

  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>EMAIL</FormLabel>
            <InputGroup>
              <Input onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>PASSWORD</FormLabel>
            <InputGroup>
              <Input onChange={(e) => setPassword(e.target.value)} />
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
