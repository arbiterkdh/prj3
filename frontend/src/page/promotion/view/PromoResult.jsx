import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import PromoPagination from "../PromoPagination.jsx";

export function PromoResult() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventResults, setEventResults] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page"), 10) || 1;

  useEffect(() => {
    const fetchEventResults = async () => {
      try {
        const response = await axios.get(
          `/api/promotion/eventResult?page=${currentPage}`,
        );
        console.log("이벤트 결과 응답:", response.data); // 응답 데이터 확인
        setEventResults(response.data.results);
        setPageInfo(response.data.pageInfo);
      } catch (error) {
        console.error("Failed to fetch event results", error);
      }
    };

    fetchEventResults();
  }, [currentPage]);

  const handleResultClick = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const handleAddClick = () => {
    navigate("/promotion/eventResult/add");
  };

  const handleDeleteClick = async (promotionId) => {
    try {
      await axios.delete(`/api/promotion/eventResult/${promotionId}`);
      setEventResults(
        eventResults.filter((event) => event.promotionId !== promotionId),
      );
      setPageInfo((prevPageInfo) => ({
        ...prevPageInfo,
        totalItems: prevPageInfo.totalItems - 1,
      }));
    } catch (error) {
      console.error("Failed to delete event result", error);
    }
  };

  const handleModifyClick = (promotionId) => {
    navigate(`/promotion/eventResult/modify/${promotionId}`);
  };

  const handleRowClick = (promotionId) => {
    navigate(`/promotion/view/${promotionId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredResults = eventResults.filter(
    (event) =>
      event.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Center>
      <CenterBox>
        <Heading textAlign="center" mb={5}>
          당첨자 발표
        </Heading>
        <Box width="100%">
          <Flex justify="flex-end" mb={5}>
            <Button
              size="sm"
              colorScheme="green"
              onClick={handleAddClick}
              mr={2}
            >
              당첨자 발표 추가
            </Button>
          </Flex>
          <Box mb={5}>
            <Text>
              -응모하신 이벤트의 당첨 여부는 나의 응모결과 확인을 통해 확인하실
              수 있습니다.
            </Text>
            <Text>
              -개인정보 처리방침에 따라 당첨자 발표일로 부터 6개월간 당첨자
              발표내역을 확인할 수 있습니다.
            </Text>
          </Box>
          <Box borderBottom={"2px solid black"} />
          <Flex>
            <Text as={"b"} mt={4} ml={"20px"}>
              전체 {pageInfo.totalItems}건
            </Text>
            <Spacer />
            <InputGroup size="sm" width="200px" mr={5}>
              <Input
                placeholder="검색어를 입력해 주세요."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <InputRightElement children={<SearchIcon color="gray.300" />} />
            </InputGroup>
          </Flex>
          <Box border="1px solid #e2e8f0" borderRadius="8px" padding="10px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>번호</Th>
                    <Th>분류</Th>
                    <Th>이벤트명</Th>
                    <Th>발표일</Th>
                    <Th>당첨자 발표</Th>
                    <Th>수정</Th>
                    <Th>삭제</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((event, index) => (
                      <Tr key={event.id} style={{ cursor: "pointer" }}>
                        <Td onClick={() => handleRowClick(event.promotionId)}>
                          {index + 1}
                        </Td>
                        <Td onClick={() => handleRowClick(event.promotionId)}>
                          <Text>{event.eventType}</Text>
                        </Td>
                        <Td onClick={() => handleRowClick(event.promotionId)}>
                          {event.eventName}
                        </Td>
                        <Td onClick={() => handleRowClick(event.promotionId)}>
                          {event.announcementDate}
                        </Td>
                        <Td>
                          <Button
                            colorScheme={"blue"}
                            onClick={() => handleResultClick(event)}
                          >
                            결과확인
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            colorScheme={"yellow"}
                            onClick={() => handleModifyClick(event.promotionId)}
                          >
                            수정
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            colorScheme={"red"}
                            onClick={() => handleDeleteClick(event.promotionId)}
                          >
                            삭제
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={7}>데이터가 없습니다.</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          {pageInfo.totalItems > 0 && (
            <PromoPagination pageInfo={pageInfo} eventType="eventResult" />
          )}
        </Box>
        {selectedEvent && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedEvent.eventName} 당첨자</ModalHeader>
              <ModalBody>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>이메일</Th>
                        <Th>당첨자 이름</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedEvent.winners.map((winner, index) => (
                        <Tr key={index}>
                          <Td>{winner.email}</Td>
                          <Td>{winner.name}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>닫기</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </CenterBox>
    </Center>
  );
}
