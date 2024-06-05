import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MarginBox from "../../css/theme/component/box/MarginBox.jsx";
import StoreMenuText from "../../css/theme/component/text/StoreMenuText.jsx";
import StoreMenuCursorBox from "../../css/theme/component/box/StoreMenuCursorBox.jsx";
import {
  faCartShopping,
  faCreditCard,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function StoreList() {
  const [productList, setProductList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productId, setProductId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    axios
      .get("/api/store/product/list")
      .then((res) => {
        setProductList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
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
        onClose();
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
            />
            <Stack mt="6" spacing="3">
              <Center>
                <Heading size="md">{product.name}</Heading>
                <Text>{product.content}</Text>
              </Center>
              <Center>
                <Text color="blue.600" fontSize="2xl">
                  {product.price}원
                </Text>
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
                <Button variant="solid" colorScheme="red">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <Text textIndent={"10px"}>카트</Text>
                </Button>
              </Box>

              <Box>
                <Button
                  onClick={() => {
                    onOpen();
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

  const navigate = useNavigate();
  return (
    <Box w={"100%"}>
      <Flex>
        <Box w={"50%"}>
          <Flex alignItems={"center"}>
            <Heading>상품 리스트</Heading>
            <Text color={"red"}>
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
              <Button onClick={onClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
