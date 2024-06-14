import React from "react";
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
  Image,
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

function ProductItemList({
  productList,
  onCartOpen,
  setProductId,
  setFileName,
  setName,
  setPrice,
  setStock,
  setQuantity,
  onDelOpen,
  onModifyOpen,
}) {
  const navigate = useNavigate();

  function handleModifyModal(id, fileName, name, price, stock) {
    setProductId(id);
    setFileName(fileName);
    setName(name);
    setPrice(price);
    setStock(stock);
    onModifyOpen();
  }
  const handleProductView = (productId) => {
    navigate(`productView/${productId}`);
  };
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
              src={product.image.src}
              borderRadius="lg"
              onClick={() => handleProductView(product.id)}
            />
            <Stack mt="6" spacing="3">
              <Center>
                <Box w={"100%"}>
                  <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
                    <Text fontSize={"1.3rem"}>{product.name}</Text>
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

  return (
    <>
      <ProductList />
    </>
  );
}

export default ProductItemList;
