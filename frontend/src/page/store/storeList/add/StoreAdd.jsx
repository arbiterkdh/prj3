import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";

export function StoreAdd() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState("");
  const [selectType, setSelectType] = useState(null);
  const [typeOption, setTypeOption] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  let disabled = true;

  if (name && file && stock && price && content) {
    disabled = false;
  }

  function handleProductAdd() {
    setIsLoading(true);
    axios
      .postForm("/api/store/product/add", {
        name,
        stock,
        price,
        content,
        file,
        type: selectType,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "상품 등록 완료",
          position: "bottom-right",
        });
        navigate("/store");
      })
      .catch(() => {
        toast({
          status: "error",
          description: "상품 등록 오류",
          position: "bottom-right",
        });
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  }

  const typeOptions = () => {
    axios
      .get("/api/store/product/type")
      .then((res) => {
        setTypeOption(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  return (
    <Center>
      <CenterBox>
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
              <Flex>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    상품이미지
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    <input
                      type={"file"}
                      accept="image/*"
                      placeholder={"이미지를 등록하세요"}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Text>
                </Box>

                <Box>
                  <Select
                    placeholder="분류선택"
                    onFocus={typeOptions}
                    onChange={(e) => {
                      setSelectType(e.target.value);
                    }}
                  >
                    {typeOption.map((typeItem) => (
                      <option key={typeItem.id} value={typeItem.id}>
                        {typeItem.name}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Flex>
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
      </CenterBox>
    </Center>
  );
}
