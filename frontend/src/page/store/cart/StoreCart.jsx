import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Checkbox,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export function StoreCart() {
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
              <Th>
                <Checkbox defaultChecked></Checkbox>
              </Th>
              <Th>이미지</Th>
              <Th>상품명</Th>
              <Th>수량</Th>
              <Th>가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th>
                <Checkbox defaultChecked></Checkbox>
              </Th>
              <Td>이미지 칸</Td>
              <Td>팝콘</Td>
              <Td>1</Td>
              <Td>3000</Td>
            </Tr>
          </Tbody>
          <Tfoot></Tfoot>
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
              <Heading>
                총 5개의 상품금액 1000000원 + 배송비 0원 = 합계 1000000원{" "}
              </Heading>
            </AlertDescription>
          </Flex>
        </Alert>
        <Box>선택 상품 주문</Box>
      </Box>
    </Box>
  );
}
