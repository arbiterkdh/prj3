import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Center,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { CartContext } from "../../../component/CartProvider.jsx";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";

function PaymentSuccess() {
  const [paymentData, setPaymentData] = useState([]);
  const Login = useContext(LoginContext);
  const location = useLocation();
  const { paymentId } = location.state || {};
  const navigate = useNavigate();

  const { setCartCount } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`/api/store/payment/orderDataList/${Login.id}/${paymentId}`)
      .then((res) => {
        setPaymentData(res.data);
        if (Login.id) {
          axios
            .get(`/api/store/cart/totalCount/${Login.id}`)
            .then((res) => {
              setCartCount(res.data);
            })
            .catch(() => {})
            .finally(() => {});
        }
      })
      .catch(() => {})
      .finally(() => {});
  }, [Login.id, paymentId, setCartCount]);

  return (
    <Center>
      <CenterBox>
        <VStack spacing={4} align="stretch" w="100%">
          <Heading size="lg" textAlign="center">
            결제 완료
          </Heading>
          <Text textAlign="center" fontSize="lg" mb={4}>
            결제가 성공적으로 완료되었습니다.
          </Text>
          {paymentData.length > 0 && (
            <>
              <Text textAlign="center" fontSize="md">
                결제주문 번호: {paymentData[0].orderNumber}
              </Text>
              <Divider />
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>상품명</Th>
                      <Th>수량</Th>
                      <Th>가격</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {paymentData.map((data, index) => (
                      <Tr key={index}>
                        <Td>{data.name}</Td>
                        <Td>{data.quantity}</Td>
                        <Td>{data.totalPrice}원</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <Box
                mt={4}
                p={4}
                borderWidth={1}
                borderRadius="md"
                bg="gray.50"
                _dark={{ bgColor: "#1F3032" }}
              >
                <Text fontSize="md">구매자: {paymentData[0].buyerName}</Text>
                <Text fontSize="md">구매일: {paymentData[0].buyerDate}</Text>
                <Text fontSize="md" fontWeight="bold">
                  총 결제 금액: {paymentData[0].amount}원
                </Text>
              </Box>
              <ColorButton
                mt={4}
                colorScheme="blue"
                onClick={() => navigate("/store")}
              >
                스토어 이동
              </ColorButton>
            </>
          )}
        </VStack>
      </CenterBox>
    </Center>
  );
}

export default PaymentSuccess;
