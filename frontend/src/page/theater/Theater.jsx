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
import { TheaterList } from "./list/TheaterList.jsx";
import { TheaterAdd } from "./add/TheaterAdd.jsx";

export function Theater() {
  return (
    <Center>
      <CenterBox>
        <Heading>전체극장</Heading>
        <TheaterList />
        <TheaterAdd />
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
