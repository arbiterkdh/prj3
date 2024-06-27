import React, { useState } from "react";
import MarginBox from "../../../../css/theme/component/box/MarginBox.jsx";
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
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCreditCard,
  faWrench,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Payment from "../../payment/Payment.jsx";
import GapFlex from "../../../../css/theme/component/flex/GapFlex.jsx";

function ProductItemList({
  productList,
  onCartOpen,
  setProductId,
  productId,
  setFileName,
  setName,
  name,
  setPrice,
  price,
  setStock,
  setQuantity,
  quantity,
  setImage,
  onDelOpen,
  onModifyOpen,
  isPayOpen,
  onPayOpen,
  onPayClose,
}) {
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  function handleModifyModal(id, fileName, name, price, stock, imgSrc) {
    setProductId(id);
    setFileName(fileName);
    setName(name);
    setPrice(price);
    setStock(stock);
    setImage(imgSrc);
    onModifyOpen();
  }
  const handleProductView = (productId) => {
    navigate(`productView/${productId}`);
  };
  const ProductList = () => {
    return (
      <MarginBox>
        <Flex w={"100%"} gap={3} flexWrap={"wrap"}>
          {productList.map((product, index) => (
            <ProductItem key={product.id} product={product} rank={index + 1} />
          ))}
        </Flex>
      </MarginBox>
    );
  };

  const ProductItem = ({ product, rank }) => {
    return (
      <Box
        style={{
          overflow: "hidden",
          flexBasis: "25%",
          maxWidth: "24%",
        }}
      >
        <Card
          maxW="sm"
          key={product.id}
          borderRadius={0}
          _dark={{ bgColor: "darkslategray", opacity: "0.9" }}
        >
          <CardBody>
            {rank && (
              <Box
                fontSize="2xl"
                fontWeight="bold"
                color={"#ed3124"}
                _dark={{ color: "blue.200" }}
              >
                {rank}위
              </Box>
            )}
            <Image
              style={{
                width: "100%",
                height: "200px",
              }}
              src={product.image.src}
              borderRadius="2xl"
              onClick={() => handleProductView(product.id)}
            />
            <Stack mt="3" spacing="0">
              <Center>
                <Box w={"100%"}>
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Text
                      _dark={{ color: "whiteAlpha.900" }}
                      fontWeight={"800"}
                      fontSize={"1.3rem"}
                    >
                      {product.name}
                    </Text>
                  </Flex>
                </Box>

                <Text>{product.content}</Text>
              </Center>
              <Center>
                <Stack justifyContent={"center"} gap={2} alignItems={"center"}>
                  <GapFlex>
                    <Box fontSize={"xs"}>({product.stock}개 남음)</Box>
                  </GapFlex>
                  <Box>
                    <Flex
                      color="blue.700"
                      _dark={{ color: "blue.400" }}
                      fontSize="xl"
                      justifyContent={"space-between"}
                    >
                      <Box w={"100px"} textAlign={"right"}>
                        {product.price}
                      </Box>
                      <Box w={"5%"}>원</Box>
                    </Flex>
                  </Box>
                </Stack>
              </Center>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            {product.stock === 0 ? (
              <Text color="red.500">구매 불가</Text>
            ) : (
              <Flex
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Button
                    p={3}
                    size={"lg"}
                    variant="solid"
                    colorScheme="blue"
                    _dark={{ bgColor: "#021514", color: "#e8ebeb" }}
                    onClick={() => {
                      onPayOpen();
                      setProductId(product.id);
                      setName(product.name);
                      setPrice(product.price);
                      setQuantity(product.quantity);
                      setProduct(product);
                      console.log(product);
                    }}
                  >
                    <FontAwesomeIcon icon={faCreditCard} />
                    <Text textIndent={"10px"}>구매</Text>
                  </Button>
                </Box>
                <Box>
                  <Button
                    p={3}
                    size={"lg"}
                    variant="solid"
                    colorScheme="red"
                    _dark={{ bgColor: "#ee3125", color: "#e8ebeb" }}
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

                <Stack align={"center"} gap={"1px"}>
                  <Button
                    p={0}
                    m={"1px"}
                    color={"red"}
                    size={"xs"}
                    onClick={() => {
                      handleModifyModal(
                        product.id,
                        product.fileName,
                        product.name,
                        product.price,
                        product.stock,
                        product.image.src,
                      );
                      console.log("name:" + product.fileName);
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faWrench}
                      size={"sm"}
                      cursor={"pointer"}
                    />
                  </Button>
                  <Button
                    p={0}
                    m={"1px"}
                    size={"xs"}
                    onClick={() => {
                      onDelOpen();
                      setProductId(product.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </Button>
                </Stack>
              </Flex>
            )}
          </CardFooter>
        </Card>
        <Modal isOpen={isPayOpen} onClose={onPayClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>알림</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>결제방식을 선택해주세요</FormLabel>
                <FormLabel>
                  상품명:{name}
                  <br />
                  수량:{quantity}
                  <br />
                  가격:{price}
                </FormLabel>
                <Payment
                  name={name}
                  quantity={quantity}
                  price={price}
                  productId={productId}
                  isSinglePurchase={true}
                  onPayClose={onPayClose}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onPayClose}>취소</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };

  return (
    <>
      <ProductList />
    </>
  );
}

export default ProductItemList;
