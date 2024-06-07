import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CenterBox from "../css/theme/component/box/CenterBox.jsx";
import MarginBox from "../css/theme/component/box/MarginBox.jsx";
import {
  faEye as emptyEye,
  faEyeSlash as emptyEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEye as fullEye,
  faEyeSlash as fullEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MemberSignup() {
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email);
  const [verified, setVerified] = useState(location.state?.verified);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [canShow, setCanShow] = useState(false);
  const [eye, setEye] = useState(false);
  const [nickName, setNickName] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  useEffect(() => {
    if (!verified) {
      navigate("/verify");
    }
  }, []);

  function handleSignup() {
    axios
      .post("/api/member/signup", { email, nickName, password })
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
        setPasswordCheck("");
        setNickName("");
      });
  }

  return (
    <Center>
      <CenterBox>
        <Heading>회원가입</Heading>
        <Box>
          <MarginBox>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <InputGroup>
                <Input value={email} readOnly />
              </InputGroup>
            </FormControl>
          </MarginBox>
          <MarginBox>
            <FormControl>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type={canShow ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
                <InputRightElement
                  onMouseEnter={() => setEye(true)}
                  onMouseLeave={() => setEye(false)}
                  onClick={() => {
                    setCanShow(!canShow);
                  }}
                >
                  {canShow && (
                    <Box>
                      {eye || <FontAwesomeIcon icon={emptyEye} />}
                      {eye && <FontAwesomeIcon icon={fullEye} />}
                    </Box>
                  )}
                  {canShow || (
                    <Box>
                      {eye || <FontAwesomeIcon icon={emptyEyeSlash} />}
                      {eye && <FontAwesomeIcon icon={fullEyeSlash} />}
                    </Box>
                  )}
                </InputRightElement>
              </InputGroup>
              {password.match(passwordRegex) ? (
                <Text h={"18px"}></Text>
              ) : (
                <Text fontSize={"xs"} color={"red.600"}>
                  비밀번호는 영문, 숫자, 특수문자 조합으로 이루어진 8~15자
                  이어야 합니다.
                </Text>
              )}
            </FormControl>
          </MarginBox>
          <MarginBox>
            <FormControl>
              <FormLabel>비밀번호 재확인</FormLabel>
              <InputGroup>
                <Input
                  type={canShow ? "text" : "password"}
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <InputRightElement w={"120px"}>
                  <Button size={"sm"} onClick={handleCheckPassword}>
                    비밀번호 확인
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </MarginBox>
          <MarginBox>
            <FormControl>
              <FormLabel>닉네임</FormLabel>
              <InputGroup>
                <Input
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </MarginBox>
        </Box>
        <Box>
          <Button onClick={handleSignup}>가입</Button>
        </Box>
      </CenterBox>
    </Center>
  );
}
