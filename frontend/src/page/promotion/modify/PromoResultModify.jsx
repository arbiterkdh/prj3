import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";

export function PromoResultModify() {
  const { id } = useParams();
  const [announcementDate, setAnnouncementDate] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState(null);
  const [members, setMembers] = useState([]);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotionResult = async () => {
      try {
        const response = await axios.get(`/api/promotion/eventResult/${id}`);
        const { promotionId, eventType, eventName, announcementDate, winners } =
          response.data;
        setAnnouncementDate(announcementDate);
        setWinners(winners || []);
        setPromotion({ promotionId, eventType, eventName });
      } catch (error) {
        console.error("Failed to fetch promotion result", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/member/list-all");
        setMembers(response.data);
      } catch (error) {
        console.error("Failed to fetch members", error);
      }
    };

    fetchPromotionResult();
    fetchMembers();
  }, [id]);

  useEffect(() => {
    setIsSubmitButtonDisabled(winners.length === 0);
  }, [winners]);

  const handleAddWinner = () => {
    if (selectedMember) {
      const isAlreadyAdded = winners.some(
        (winner) => winner.email === selectedMember.email,
      );
      if (isAlreadyAdded) {
        toast({
          title: "이미 추가된 당첨자입니다.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else {
        setWinners([...winners, selectedMember]);
        setSelectedMember(null);
      }
    } else {
      setWinners([...winners, { email: "none", nickName: "none" }]);
      toast({
        title: "기본값으로 추가되었습니다.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleRemoveWinner = (index) => {
    const newWinners = winners.filter((_, i) => i !== index);
    setWinners(newWinners);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/promotion/eventResult/${id}`, {
        promotionId: promotion.promotionId,
        announcementDate,
        winners,
      });

      toast({
        title: "당첨자 발표가 수정되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/promotion/eventResult");
    } catch (error) {
      console.error("수정 오류:", error);
      toast({
        title: "수정 중 오류가 발생하였습니다.",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.email.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      member.nickName.toLowerCase().includes(memberSearchQuery.toLowerCase()),
  );

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center>
      <CenterBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.100"
      >
        <Box
          width="70%"
          maxWidth="800px"
          border="2px solid"
          borderColor="blue.300"
          borderRadius="10px"
          p={6}
          boxShadow="md"
          bg={bgColor}
          color={textColor}
        >
          <Heading textAlign="center" mb={6} fontWeight="bold" fontSize="2xl">
            당첨자 발표 수정
          </Heading>
          <Box width="100%">
            <form onSubmit={handleSubmit}>
              <FormControl id="promotion" mb={4}>
                <FormLabel fontWeight="bold" fontSize="lg">
                  이벤트 선택
                </FormLabel>
                <Text>
                  {promotion
                    ? `${promotion.eventName} - ${promotion.eventType} - ${announcementDate}`
                    : "로딩 중..."}
                </Text>
              </FormControl>
              <Flex mb={4}>
                <FormControl id="member" mr={4}>
                  <FormLabel fontWeight="bold" fontSize="lg">
                    이메일과 닉네임 선택
                  </FormLabel>
                  <Select
                    placeholder="당첨자를 선택하세요"
                    value={
                      selectedMember
                        ? `${selectedMember.email} (${selectedMember.nickName})`
                        : ""
                    }
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setSelectedMember(null);
                      } else {
                        const [email, nickName] = e.target.value.split(" (");
                        setSelectedMember(
                          members.find(
                            (member) =>
                              member.email === email &&
                              member.nickName === nickName.slice(0, -1),
                          ),
                        );
                      }
                    }}
                    borderColor="gray.300"
                    focusBorderColor="blue.300"
                    _hover={{ borderColor: "blue.300" }}
                  >
                    {filteredMembers.map((member) => (
                      <option
                        key={member.email}
                        value={`${member.email} (${member.nickName})`}
                      >
                        {member.email} - {member.nickName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="memberSearchQuery">
                  <FormLabel fontWeight="bold" fontSize="lg">
                    회원 검색
                  </FormLabel>
                  <Input
                    placeholder="이메일 또는 닉네임을 입력하세요"
                    value={memberSearchQuery}
                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                    borderColor="gray.300"
                    focusBorderColor="blue.300"
                    _hover={{ borderColor: "blue.300" }}
                  />
                </FormControl>
              </Flex>
              <Button colorScheme="green" onClick={handleAddWinner} mb={4}>
                당첨자 추가
              </Button>
              <Table mt={4}>
                <Thead>
                  <Tr>
                    <Th>이메일</Th>
                    <Th>당첨자 닉네임</Th>
                    <Th>삭제</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {winners.map((winner, index) => (
                    <Tr key={index}>
                      <Td>{winner.email}</Td>
                      <Td>{winner.nickName}</Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => handleRemoveWinner(index)}
                        >
                          삭제
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Button
                type="submit"
                colorScheme="blue"
                mt={6}
                width="full"
                isDisabled={isSubmitButtonDisabled}
                fontSize="lg"
                py={6}
              >
                수정하기
              </Button>
            </form>
          </Box>
        </Box>
      </CenterBox>
    </Center>
  );
}
