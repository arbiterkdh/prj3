import React, { useState } from "react";
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
import CenterBox from "../css/theme/component/box/CenterBox.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye as emptyEye,
  faEyeSlash as emptyEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEye as fullEye,
  faEyeSlash as fullEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import MarginBox from "../css/theme/component/box/MarginBox.jsx";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ColorButton from "../css/theme/component/button/ColorButton.jsx";

function MemberUpdate() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email);
  const [verified, setVerified] = useState(location.state?.verified);
  const [canShow, setCanShow] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [eye, setEye] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  let isPasswordChecked =
    password === passwordCheck && password.match(passwordRegex);
  let allChecked = isPasswordChecked;

  function handleUpdatePw() {
    axios
      .put("/api/member/mypage/updatePassword", {
        email,
        password,
      })
      .then(() => {
        toast({
          status: "success",
          description: "비밀번호 변경 완료",
          position: "bottom-right",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: "비밀번호 변경중 문제 발생",
          position: "bottom-right",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  return (
    <Center>
      <CenterBox>
        <Heading>회원정보 변경</Heading>
        <Box>
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
        </Box>
        <Box>
          <Button onClick={onOpen} isDisabled={!allChecked}>
            변경
          </Button>
        </Box>
      </CenterBox>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>변경 알림</ModalHeader>
          <ModalBody>변경하시겠습니까?</ModalBody>
          <ModalFooter>
            <ColorButton onClick={handleUpdatePw}>확인</ColorButton>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              onClick={() => onClose()}
            >
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export default MemberUpdate;
