import {
  Box,
  Center,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";

export function PromoEnd() {
  return (
    <Center>
      <CenterBox>
        <Box width="100%" textAlign="center">
          <Heading>종료된 이벤트</Heading>
          <Box height="30px" />
          <Text>
            -응모하신 이벤트의 당첨 여부는 당첨자발표의 나의 응모결과 확인을
            통해 확인하실 수 있습니다.
          </Text>
          <Box height="30px" />
          <Box border="1px solid #e2e8f0" borderRadius="8px" padding="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>이벤트 이미지</Th>
                    <Th>이벤트 정보</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <img
                        src=""
                        alt="이벤트 이미지"
                        width="100"
                        height="100"
                      />
                    </Td>
                    <Td>
                      <Text fontWeight="bold">
                        [파주출판도시] 모든 날, 모든 순간 영화 할인
                      </Text>
                      <Text color="gray.500">극장</Text>
                      <Text color="gray.500">2024.03.25 ~ 2025.04.01</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </CenterBox>
    </Center>
  );
}
