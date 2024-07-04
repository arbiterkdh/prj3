import {
  Box,
  Button,
  Center,
  Flex,
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
  Select,
  Stack,
  StackDivider,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";
import ColorButton from "../../../../css/theme/component/button/ColorButton.jsx";

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
        <Heading mb={10}>상품 등록</Heading>

        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <FormControl>
              <FormLabel>상품명</FormLabel>
            </FormControl>
            <Input
              type={"text"}
              placeholder={"상품명을 작성해주세요"}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box>
            <FormControl>
              <FormLabel>이미지</FormLabel>
            </FormControl>
            <Input
              w={"300px"}
              border={"none"}
              type={"file"}
              accept="image/*"
              placeholder={"이미지를 등록하세요"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Box>

          <Box>
            <FormControl>
              <FormLabel>분류</FormLabel>
            </FormControl>

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

          <Box>
            <FormControl>
              <FormLabel>재고수량</FormLabel>
            </FormControl>
            <InputGroup w={"300px"}>
              <Input
                min={0}
                type={"number"}
                onChange={(e) => setStock(e.target.value)}
              />
              <InputRightElement>개</InputRightElement>
            </InputGroup>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>가격</FormLabel>
            </FormControl>
            <InputGroup w={"300px"}>
              <Input
                min={0}
                type={"number"}
                onChange={(e) => setPrice(e.target.value)}
              />
              <InputRightElement>원</InputRightElement>
            </InputGroup>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>설명</FormLabel>
            </FormControl>
            <Textarea
              placeholder={"상세내용을 작성하세요"}
              resize={"none"}
              onChange={(e) => setContent(e.target.value)}
            ></Textarea>
          </Box>
        </Stack>
        <Flex>
          <Box>
            <ColorButton
              onClick={onOpen}
              isDisabled={disabled}
              isLoading={isLoading}
            >
              등록
            </ColorButton>
          </Box>
          <Box>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              w={"100%"}
            >
              목록
            </Button>
          </Box>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>등록안내</ModalHeader>
            <ModalBody>상품을 등록하시겠습니까?</ModalBody>
            <ModalFooter>
              <Flex gap={3}>
                <ColorButton colorScheme={"green"} onClick={handleProductAdd}>
                  확인
                </ColorButton>
                <Button
                  bgColor={"dimgray"}
                  color={"white"}
                  _hover={{
                    bgColor: "gray",
                  }}
                  onClick={onClose}
                >
                  취소
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CenterBox>
    </Center>
  );
}
