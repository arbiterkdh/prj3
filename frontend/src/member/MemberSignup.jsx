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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
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
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  let nickNameRegex = /^[가-힣0-9]{2,10}$/;

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
          description: `회원이 되신걸 환영합니다, ${nickName}님.😄`,
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
        onClose();
      });
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/${nickName}`)
      .then(() => {
        toast({
          status: "success",
          description: "사용 가능한 별명입니다.",
          position: "bottom-right",
        });
        setIsNickNameChecked(true);
      })
      .catch((err) => {
        if (err.value.status === 409) {
          toast({
            status: "warning",
            description: "이미 사용중인 별명입니다.",
            position: "bottom-right",
          });
        }
      });
  }

  let isPasswordChecked =
    password === passwordCheck && password.match(passwordRegex);
  let allChecked =
    isPasswordChecked && nickName.match(nickNameRegex) && isNickNameChecked;

  return (
    <Center>
      <CenterBox>
        <Heading>회원가입</Heading>
        <Box>
          <MarginBox>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <InputGroup>
                <Input value={email} readOnly cursor={"default"} />
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
              {password.length > 0 && !password.match(passwordRegex) ? (
                <Text fontSize={"xs"} color={"red.600"}>
                  비밀번호는 영문, 숫자, 특수문자 조합으로 이루어진 8~15자
                  이어야 합니다.
                </Text>
              ) : (
                <Text h={"18px"}></Text>
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
                  isDisabled={!password.match(passwordRegex)}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </InputGroup>
              {passwordCheck.length > 0 && passwordCheck !== password ? (
                <Text fontSize={"xs"} color={"red.600"}>
                  비밀번호가 다릅니다.
                </Text>
              ) : (
                <Text h={"18px"}></Text>
              )}
            </FormControl>
          </MarginBox>
          <MarginBox>
            <FormControl>
              <FormLabel>닉네임 (별명)</FormLabel>
              <InputGroup>
                <Input
                  value={nickName}
                  isDisabled={!isPasswordChecked}
                  onChange={(e) => {
                    setNickName(e.target.value);
                    setIsNickNameChecked(false);
                  }}
                />
                <InputRightElement w={"80px"}>
                  <Button
                    size={"sm"}
                    isDisabled={!nickName.match(nickNameRegex)}
                    onClick={handleCheckNickName}
                  >
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
              {nickName.length > 0 && !nickName.match(nickNameRegex) ? (
                <Text fontSize={"xs"} color={"red.600"}>
                  닉네임은 한글조합, 숫자로 이루어진 2~10자 이어야 합니다.
                </Text>
              ) : (
                <Text h={"18px"}></Text>
              )}
            </FormControl>
          </MarginBox>
        </Box>
        <Box>
          <Button onClick={onOpen} isDisabled={!allChecked}>
            가입
          </Button>
        </Box>
      </CenterBox>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>가입 확인</ModalHeader>
          <ModalBody>이대로 가입하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={handleSignup}>확인</Button>
            <Button onClick={() => onClose()}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
