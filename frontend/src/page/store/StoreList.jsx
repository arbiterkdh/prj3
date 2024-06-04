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
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MarginBox from "../../css/theme/component/box/MarginBox.jsx";

export function StoreList() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/store/product/list")
      .then((res) => {
        setProductList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

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
                  구매
                </Button>
              </Box>
              <Box>
                <Button variant="solid" colorScheme="red">
                  카트
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
    <Box>
      <h1>상품 리스트</h1>
      <Button onClick={() => navigate("/store/add")}>상품등록</Button>
      <ProductList />
    </Box>
  );
}
