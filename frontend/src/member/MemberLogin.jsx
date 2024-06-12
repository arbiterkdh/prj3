import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MarginBox from "../css/theme/component/box/MarginBox.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CursorBox from "../css/theme/component/box/CursorBox.jsx";
import { useContext, useState } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye as emptyEye,
  faEyeSlash as emptyEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEye as fullEye,
  faEyeSlash as fullEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export function MemberLogin() {
  const account = useContext(LoginContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [canShow, setCanShow] = useState(false);
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);
        toast({
          status: "success",
          description: "로그인되었습니다.",
          position: "bottom-right",
        });
        onClose();
        navigate("/");
      })
      .catch(() => {
        account.logout();
        toast({
          status: "warning",
          description: "이메일 혹은 비밀번호를 확인해주세요.",
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
      <Box onClick={onOpen}>로그인</Box>
      <Modal
        size={"4xl"}
        isOpen={isOpen}
        onClose={() => {
          setCanShow(false);
          onClose();
        }}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent h={"500px"}>
          <ModalHeader bgColor={"purple"} h={12} alignContent={"center"}>
            로그인
          </ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"space-between"} h={"100%"}>
            <MarginBox w={"50%"}>
              <ModalBody>
                <MarginBox>
                  <Input
                    placeholder={"이메일"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroup display={"inherit"}>
                    <Input
                      type={canShow ? "text" : "password"}
                      value={password}
                      placeholder={"비밀번호"}
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
                </MarginBox>
              </ModalBody>
              <ModalFooter>
                <Button w={"100%"} onClick={handleLogin}>
                  로그인
                </Button>
              </ModalFooter>
              <ModalFooter display="flex" justifyContent="space-evenly">
                <CursorBox>ID/PW 찾기</CursorBox>
                <Divider orientation={"vertical"} />
                <CursorBox
                  onClick={() => {
                    navigate("/signup");
                    onClose();
                  }}
                >
                  회원가입
                </CursorBox>
                <Divider orientation={"vertical"} />
                <CursorBox>비회원 예매확인</CursorBox>
              </ModalFooter>
              <ModalFooter display="flex" justifyContent="space-evenly">
                <a href={""}>
                  <Image
                    src={
                      "https://megabox.co.kr/static/pc/images/member/ico-naver.png"
                    }
                  />
                </a>
                <a
                  href={`https://kauth.kakao.com/oauth/authorize?client_id=${account.kakaoKey}&redirect_uri=${account.kakaoUri}&response_type=code`}
                >
                  <Image
                    src={
                      "https://megabox.co.kr/static/pc/images/member/ico-kakao.png"
                    }
                  />
                </a>
                <a href={""}>
                  <Image
                    src={
                      "https://megabox.co.kr/static/pc/images/member/ico-payco.png"
                    }
                  />
                </a>
              </ModalFooter>
            </MarginBox>
            <MarginBox border={"1px solid black"} w={"50%"} h={"100%"}>
              광고
            </MarginBox>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
}
