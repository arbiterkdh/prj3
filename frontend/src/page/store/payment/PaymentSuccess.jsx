import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { CartContext } from "../../../component/CartProvider.jsx";

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
  }, []);

  return (
    <Center>
      <CenterBox>
        <Text mb={3}>결제 완료되었습니다</Text>
        {paymentData.length > 0 && (
          <>
            <Text mb={5}>결제주문 번호:{paymentData[0].orderNumber}</Text>
            <Text mb={5}>결제 내역</Text>
            <hr />
            <TableContainer>
              <Table size="sm">
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
                      <Td>{data.totalPrice}</Td>
                      <Td>
                        <img
                          src={`data:image/png;base64,${data.qrCode}`}
                          alt="QR Code"
                          width={"200px"}
                          height={"200px"}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr mb={3}>
                    <Td>
                      <Text mb={5}>구매자:{paymentData[0].buyerName}</Text>
                      <Text mb={5}>구매일 : {paymentData[0].buyerDate}</Text>
                      <Text mb={5}>
                        총 결제 금액 : {paymentData[0].amount}원
                      </Text>
                      <Button onClick={() => navigate("/store")}>
                        스토어 이동
                      </Button>
                    </Td>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </>
        )}
      </CenterBox>
    </Center>
  );
}

export default PaymentSuccess;
