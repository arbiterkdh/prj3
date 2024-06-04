import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function StoreAdd() {
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  let disabled = true;

  if (name && files && stock && price && content) {
    disabled = false;
  }

  function handleProductAdd() {
    setIsLoading(true);
    axios
      .post("/api/store/add", {
        name,
        files,
        stock,
        price,
        content,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "회원가입 완료",
          position: "bottom",
        });
      })
      .catch(() => {
        toast({
          status: "error",
          description: "가입 오류",
          position: "bottom",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading>상품 등록</Heading>
        </CardHeader>
        <Box>
          <hr />
        </Box>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                상품명
              </Heading>
              <Text pt="2" fontSize="sm">
                <Input
                  type={"text"}
                  placeholder={"상품명을 작성해주세요"}
                  onChange={(e) => setName(e.target.value)}
                />
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                상품이미지
              </Heading>
              <Text pt="2" fontSize="sm">
                <input
                  type={"file"}
                  placeholder={"이미지를 등록하세요"}
                  onChange={(e) => setFiles(e.target.files)}
                />
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                재고수량
              </Heading>
              <Text pt="2" fontSize="sm">
                <Input
                  type={"number"}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                가격
              </Heading>
              <Text pt="2" fontSize="sm">
                <Input
                  type={"number"}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                상세내용
              </Heading>
              <Text pt="2" fontSize="sm">
                <Textarea
                  placeholder={"상세내용을 작성하세요"}
                  resize={"none"}
                  onChange={(e) => setContent(e.target.value)}
                ></Textarea>
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <Flex w={"100%"} gap={3} justifyContent={"center"}>
          <Box w={"50%"}>
            <Button
              colorScheme={"green"}
              w={"100%"}
              p={10}
              onClick={onOpen}
              isDisabled={disabled}
              isLoading={isLoading}
            >
              등록
            </Button>
          </Box>
          <Box w={"50%"}>
            <Button colorScheme={"gray"} w={"100%"} p={10}>
              목록
            </Button>
          </Box>
        </Flex>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>등록안내</ModalHeader>
          <ModalBody>상품을 등록하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex gap={3}>
              <Button colorScheme={"green"} onClick={handleProductAdd}>
                확인
              </Button>
              <Button onClick={onClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
