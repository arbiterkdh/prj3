import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
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
  useToast,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import PromoResultPagination from "../component/PromoResultPagination.jsx";
import PromoSearchBar from "../component/PromoSearchBar.jsx";
import EventTypeLabel from "../component/PromoeventTypeLabels.jsx";
import { LoginContext } from "../../../component/LoginProvider.jsx";

export function PromoResult() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventResults, setEventResults] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { nickName } = useParams();
  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const searchQuery = searchParams.get("search") || "";
  const pageSize = 10;
  const toast = useToast();
  const account = useContext(LoginContext);

  const fetchEventResults = async (page, search) => {
    try {
      const response = await axios.get(
        `/api/promotion/eventResult?page=${page}&pageSize=${pageSize}&search=${search}`,
      );
      setEventResults(response.data.results);
      setPageInfo(response.data.pageInfo);
    } catch (error) {
      console.error("당첨자 발표를 가져오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchEventResults(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

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
      toast({
        title: "삭제 성공",
        description: "당첨자 발표가 성공적으로 삭제되었습니다.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "삭제 실패",
        description: "당첨자 발표 삭제에 실패했습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleModifyClick = (promotionId) => {
    navigate(`/promotion/eventResult/modify/${promotionId}`);
  };

  const handleRowClick = (promotionId) => {
    navigate(`/promotion/view/${promotionId}`);
  };

  const handleSearch = (query) => {
    setSearchParams({ page: 1, search: query });
  };

  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchQuery });
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
          <Box mb={5} mt={10}>
            <Flex
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Text textAlign="center">
                -이벤트의 당첨 여부는 결과 확인을 통해 확인하실 수 있습니다.
              </Text>
              {account.isAdmin() && (
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={handleAddClick}
                  ml={2}
                  position="absolute"
                  right={0}
                >
                  당첨자 발표 추가
                </Button>
              )}
            </Flex>
          </Box>
          <Box borderBottom={"2px solid black"} mt={10} />
          <Flex>
            <Text as={"b"} mt={4} ml={"20px"}>
              전체 {pageInfo.totalItems}건
            </Text>
            <Spacer />
            <PromoSearchBar onSearch={handleSearch} />
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
                    {account.isAdmin() && <Th>수정</Th>}
                    {account.isAdmin() && <Th>삭제</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((event, index) => (
                      <Tr key={event.id} style={{ cursor: "pointer" }}>
                        <Td onClick={() => handleRowClick(event.promotionId)}>
                          {index + 1 + (currentPage - 1) * pageSize}
                        </Td>
                        <Td onClick={() => handleRowClick(event.promotionId)}>
                          <Text>
                            <EventTypeLabel eventType={event.eventType} />
                          </Text>
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
                        {account.isAdmin() && (
                          <Td>
                            <Button
                              colorScheme={"yellow"}
                              onClick={() =>
                                handleModifyClick(event.promotionId)
                              }
                            >
                              수정
                            </Button>
                          </Td>
                        )}
                        {account.isAdmin() && (
                          <Td>
                            <Button
                              colorScheme={"red"}
                              onClick={() =>
                                handleDeleteClick(event.promotionId)
                              }
                            >
                              삭제
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={7} textAlign="center">
                        해당 당첨자 발표가 없습니다.
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          {pageInfo.totalItems > 0 && (
            <PromoResultPagination
              pageInfo={pageInfo}
              onPageChange={handlePageChange}
            />
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
                        <Th>당첨자 닉네임</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedEvent.winners.map((winner, index) => (
                        <Tr key={index}>
                          <Td>{winner.email}</Td>
                          <Td>{winner.nickName}</Td>
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
