import {
  Box,
  Center,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import TheaterListBox from "../../css/theme/component/box/TheaterListBox.jsx";

export function Theater() {
  return (
    <Center>
      <CenterBox>
        <Heading>전체극장</Heading>
        <Box w={"100%"} border={"1px solid black"}>
          <Flex width={"100%"}>
            <TheaterListBox>서울</TheaterListBox>
            <TheaterListBox>경기</TheaterListBox>
            <TheaterListBox>인천</TheaterListBox>
            <TheaterListBox>대전/충청/세종</TheaterListBox>
            <TheaterListBox>부산/대구/경상</TheaterListBox>
            <TheaterListBox>광주/전라</TheaterListBox>
            <TheaterListBox>강원</TheaterListBox>
            <TheaterListBox>제주</TheaterListBox>
          </Flex>
          <Box>각 극장들</Box>
        </Box>
        <Box>
          <Heading>극장 이벤트</Heading>
          <Flex>
            <Box w={"50%"} h={"240px"} border={"1px solid black"}>
              이벤트1
            </Box>
            <Box w={"50%"} h={"240px"} border={"1px solid black"}>
              이벤트2
            </Box>
          </Flex>
        </Box>
        <Box>
          <Heading>극장 공지사항</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>극장</Th>
                <Th>제목</Th>
                <Th>지역</Th>
                <Th>등록일</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </CenterBox>
    </Center>
  );
}
