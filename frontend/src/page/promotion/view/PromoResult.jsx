import {
  Box,
  Button,
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

export function PromoResult() {
  return (
    <Center>
      <CenterBox>
        <Heading textAlign="center">당첨자 발표</Heading>
        <Box width="100%">
          <Box height="30px" />
          <Text>
            -응모하신 이벤트의 당첨 여부는 나의 응모결과 확인을 통해 확인하실 수
            있습니다.
          </Text>
          <Text>
            -개인정보 처리방침에 따라 당첨자 발표일로 부터 6개월간 당첨자
            발표내역을 확인할 수 있습니다. 나의 응모결과확인
          </Text>
          <Box height="30px" />
          <Box border="1px solid #e2e8f0" borderRadius="8px" padding="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>번호</Th>
                    <Th>분류</Th>
                    <Th>이벤트명</Th>
                    <Th>발표일</Th>
                    <Th>당첨자 발표</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>게시물 번호</Td>
                    <Td>
                      <Text>이벤트 타입</Text>
                    </Td>
                    <Td>이벤트 제목</Td>
                    <Td>이벤트 발표</Td>
                    <Button colorScheme={"blue"}>결과확인</Button>
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
