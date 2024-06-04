import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import MarginBox from "../css/theme/component/box/MarginBox.jsx";
import axios from "axios";

export function MemberLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleLogin() {
    axios.post("/api/member/token");
  }

  return (
    <Box>
      <Box onClick={onOpen} cursor={"pointer"}>
        로그인
      </Box>
      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent h={"500px"}>
          <ModalHeader bgColor={"purple"} h={12}>
            로그인
          </ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"space-between"} h={"100%"}>
            <MarginBox w={"50%"}>
              <ModalBody>
                <MarginBox>
                  <Box>
                    <Input placeholder={"로그인"} />
                  </Box>
                  <Box>
                    <Input placeholder={"비밀번호"} />
                  </Box>
                </MarginBox>
              </ModalBody>
              <ModalFooter>
                <Button w={"100%"} onClick={handleLogin}>
                  로그인
                </Button>
              </ModalFooter>
              <ModalFooter display="flex" justifyContent="space-evenly">
                <Box>ID/PW 찾기</Box>
                <>|</>
                <Box>회원가입</Box>
                <>|</>
                <Box>비회원 예매확인</Box>
              </ModalFooter>
              <ModalFooter display="flex" justifyContent="space-evenly">
                <Box>NAVER</Box>
                <Box>KAKAO</Box>
                <Box>PAYCO</Box>
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
