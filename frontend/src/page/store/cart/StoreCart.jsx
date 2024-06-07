import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CenterTh from "../../../css/theme/component/table/thead/tr/th/CenterTh.jsx";
import axios from "axios";
import CenterTd from "../../../css/theme/component/table/thead/tr/td/CenterTd.jsx";

export function StoreCart() {
  const [productCartList, setProductCartList] = useState([]);
  const [quantity, setQuantity] = useState(null);

  const updateQuantity = (productId, quantityItem) => {
    setProductCartList((itemList) =>
      itemList.map((item) =>
        item.productId === productId
          ? { ...item, quantity: quantityItem }
          : item,
      ),
    );
  };

  useEffect(() => {
    axios
      .get(`/api/store/cart/list`)
      .then((res) => {
        setProductCartList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  function CartItem({ cartItem }) {
    return (
      <>
        <Tr>
          <CenterTd>
            <Checkbox defaultChecked></Checkbox>
          </CenterTd>
          <CenterTd>
            <Image
              src={`http://127.0.0.1:8888/${cartItem.productId}/${cartItem.fileName}`}
            ></Image>
          </CenterTd>
          <CenterTd>{cartItem.name}</CenterTd>
          <CenterTd>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Button
                onClick={() => {
                  if (cartItem.quantity > 1) {
                    updateQuantity(cartItem.productId, cartItem.quantity - 1);
                  }
                }}
              >
                -
              </Button>
              <Text>{cartItem.quantity}</Text>
              <Button
                onClick={() => {
                  updateQuantity(cartItem.productId, cartItem.quantity + 1);
                }}
              >
                +
              </Button>
            </Flex>
          </CenterTd>
          <CenterTd>{cartItem.price * cartItem.quantity}</CenterTd>
          <CenterTd>
            <Button colorScheme={"red"}>삭제</Button>
          </CenterTd>
          <CenterTd>{cartItem.regDate}</CenterTd>
        </Tr>
      </>
    );
  }

  const ProductCartList = () => {
    return (
      <>
        {productCartList.map((cartItem) => (
          <CartItem key={cartItem.productId} cartItem={cartItem} />
        ))}
      </>
    );
  };

  return (
    <Box>
      <Box>
        <Heading>카트</Heading>
      </Box>
      <Box>
        <hr />
      </Box>

      <TableContainer mb={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <CenterTh w={"10%"}>
                <Checkbox defaultChecked></Checkbox>
              </CenterTh>
              <CenterTh w={"20%"}>이미지</CenterTh>
              <CenterTh w={"20%"}>상품명</CenterTh>
              <CenterTh w={"10%"}>수량</CenterTh>
              <CenterTh w={"10%"}>가격</CenterTh>
              <CenterTh w={"10%"}>삭제</CenterTh>
              <CenterTh w={"20"}>담은일</CenterTh>
            </Tr>
          </Thead>
          <Tbody>
            <ProductCartList />
          </Tbody>
        </Table>
      </TableContainer>
      <Box>
        <Box mb={10}>
          <Heading>최종 결제 금액</Heading>
        </Box>
        <Alert status="info">
          <Flex m={10} justifyContent={"flex-end"} w={"100%"}>
            <AlertIcon />
            <AlertDescription>
              <Text fontSize={"1.3rem"}>
                총 5개의 상품금액 1000000원 + 배송비 0원 = 합계 1000000원{" "}
              </Text>
            </AlertDescription>
          </Flex>
        </Alert>
      </Box>
      <Box>
        <Button colorScheme={"green"} w={"100%"}>
          상품 결제
        </Button>
      </Box>
    </Box>
  );
}
