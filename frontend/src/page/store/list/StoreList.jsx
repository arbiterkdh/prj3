import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MarginBox from "../../../css/theme/component/box/MarginBox.jsx";
import StoreMenuText from "../../../css/theme/component/text/StoreMenuText.jsx";
import StoreMenuCursorBox from "../../../css/theme/component/box/StoreMenuCursorBox.jsx";
import {
  faCartShopping,
  faCreditCard,
  faWrench,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function StoreList() {
  const [productList, setProductList] = useState([]);
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

  const {
    isOpen: isModifyOpen,
    onOpen: onModifyOpen,
    onClose: onModifyClose,
  } = useDisclosure();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const [productId, setProductId] = useState(0);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const productListRefresh = () => {
    axios
      .get("/api/store/product/list")
      .then((res) => {
        setProductList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    productListRefresh();
  }, []);

  function handleProductDelete() {
    setIsLoading(true);

    axios
      .delete(`/api/store/product/delete/${productId}`)
      .then((res) => {
        toast({
          status: "success",
          description: "삭제 성공",
          position: "top",
        });
        setProductList(
          productList.filter((product) => product.id !== productId),
        );
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        onDelClose();
      });
  }

  const ProductList = () => {
    return (
      <MarginBox>
        <Flex w={"100%"} gap={3} flexWrap={"wrap"}>
          {productList.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Flex>
      </MarginBox>
    );
  };

  function handleModifyModal(id, fileName, name, price, stock) {
    setProductId(id);
    setFileName(fileName);
    setName(name);
    setPrice(price);
    setStock(stock);
    onModifyOpen();
  }

  function handleCartAdd(productId) {
    axios
      .postForm(`/api/store/cart/add`, {
        id: productId,
        name,
        fileName,
        price,
        quantity,
      })
      .then(() => {
        toast({
          status: "success",
          description: "장바구니 담기 완료",
          position: "bottom",
        });
      })
      .catch(() => {})
      .finally(() => {
        onCartClose();
      });
  }

  const handleProductView = (productId) => {
    navigate(`productView/${productId}`);
  };

  const ProductItem = ({ product }) => {
    return (
      <Box
        style={{
          overflow: "hidden",
          flexBasis: "25%",
          maxWidth: "24%",
        }}
      >
        <Card maxW="sm">
          <CardBody>
            <Image
              style={{
                width: "100%",
                height: "250px",
              }}
              src={`http://127.0.0.1:8888/${product.id}/${product.fileName}`}
              borderRadius="lg"
              onClick={() => handleProductView(product.id)}
            />
            <Stack mt="6" spacing="3">
              <Center>
                <Box w={"100%"}>
                  <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
                    <Heading>{product.name}</Heading>
                    <Text
                      color={"red"}
                      onClick={() =>
                        handleModifyModal(
                          product.id,
                          product.fileName,
                          product.name,
                          product.price,
                          product.stock,
                        )
                      }
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faWrench}
                        fontSize={"1.2rem"}
                        cursor={"pointer"}
                      />
                    </Text>
                  </Flex>
                </Box>

                <Text>{product.content}</Text>
              </Center>
              <Center>
                <Flex justifyContent={"center"} gap={3} alignItems={"center"}>
                  <Box>
                    <Text color="blue.600" fontSize="2xl">
                      {product.price}원
                    </Text>
                  </Box>
                  <Box>{product.stock}개 남음</Box>
                </Flex>
              </Center>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box>
                <Button variant="solid" colorScheme="blue">
                  <FontAwesomeIcon icon={faCreditCard} />
                  <Text textIndent={"10px"}>구매</Text>
                </Button>
              </Box>
              <Box>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={() => {
                    onCartOpen();
                    setProductId(product.id);
                    setName(product.name);
                    setPrice(product.price);
                    setFileName(product.fileName);
                    setQuantity(product.quantity);
                  }}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <Text textIndent={"10px"}>카트</Text>
                </Button>
              </Box>

              <Box>
                <Button
                  onClick={() => {
                    onDelOpen();
                    setProductId(product.id);
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </Button>
              </Box>
            </Flex>
          </CardFooter>
        </Card>
      </Box>
    );
  };

  function handleProductModify(productId, fileName, name, price, file, stock) {
    axios
      .putForm(`/api/store/product/modify`, {
        productId,
        fileName,
        name,
        price,
        file,
        stock,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "수정 완료",
          position: "bottom",
        });
        productListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onModifyClose();
      });
  }

  const handleNumberInputChange = (value) => {
    const val = parseInt(value, 10);
    setStock(isNaN(value) ? 0 : value);
  };

  return (
    <Box w={"100%"}>
      <Flex>
        <Box w={"50%"}>
          <Flex alignItems={"center"}>
            <Heading>상품 리스트</Heading>
            <Text color={"red"} onClick={() => navigate("cart")}>
              {" "}
              <FontAwesomeIcon
                icon={faCartShopping}
                fontSize={"1.2rem"}
                cursor={"pointer"}
              />
            </Text>
          </Flex>
        </Box>
        <Box w={"50%"} textAlign={"right"}>
          <Button onClick={() => navigate("/store/add")} colorScheme={"green"}>
            상품등록
          </Button>
        </Box>
      </Flex>

      <Flex
        w={"100%"}
        style={{
          textAlign: "center",
        }}
        p={7}
      >
        <StoreMenuCursorBox>
          <StoreMenuText>전체</StoreMenuText>
        </StoreMenuCursorBox>
        <StoreMenuCursorBox>
          <StoreMenuText>Best</StoreMenuText>
        </StoreMenuCursorBox>
        <StoreMenuCursorBox>
          <StoreMenuText>세트</StoreMenuText>
        </StoreMenuCursorBox>
        <StoreMenuCursorBox>
          <StoreMenuText>팝콘</StoreMenuText>
        </StoreMenuCursorBox>
        <StoreMenuCursorBox>
          <StoreMenuText>드링크</StoreMenuText>
        </StoreMenuCursorBox>
        <StoreMenuCursorBox>
          <StoreMenuText>간식</StoreMenuText>
        </StoreMenuCursorBox>
      </Flex>

      <Box>
        <hr />
      </Box>

      <ProductList />
      <Modal isOpen={isDelOpen} onClose={onDelClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>알림</ModalHeader>
          <ModalBody>상품을 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                colorScheme={"green"}
                onClick={handleProductDelete}
                isLoading={isLoading}
              >
                확인
              </Button>
              <Button onClick={onDelClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isModifyOpen} onClose={onModifyOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상품 수정</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <Image src={`http://127.0.0.1:8888/${productId}/${fileName}`} />
              <input
                multiple
                type={"file"}
                accept="image/*"
                placeholder={"이미지를 등록하세요"}
                onChange={(e) => setFile(e.target.files)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>상품명</FormLabel>
              <Input
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Flex>
              <NumberInput
                clampValueOnBlur
                maxW="100px"
                mr="2rem"
                min={1}
                max={2000}
                value={stock}
                onChange={handleNumberInputChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex="1"
                focusThumbOnChange={false}
                value={stock}
                min={1}
                max={2000}
                onChange={(e) => setStock(e.target.value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px">
                  {stock}
                </SliderThumb>
              </Slider>
            </Flex>

            <FormControl>
              <FormLabel>가격</FormLabel>
              <Input
                type={"number"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                colorScheme={"green"}
                onClick={() =>
                  handleProductModify(
                    productId,
                    fileName,
                    name,
                    price,
                    file,
                    stock,
                  )
                }
                isLoading={isLoading}
              >
                확인
              </Button>
              <Button onClick={onModifyClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCartOpen} onClose={onCartClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>카트 담기</ModalHeader>
          <ModalBody>{name}상품을 담으시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => {
                  handleCartAdd(productId, name, fileName, price, quantity);
                }}
                colorScheme={"green"}
              >
                확인
              </Button>
              <Button onClick={onCartClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
