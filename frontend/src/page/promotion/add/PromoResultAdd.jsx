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
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { useNavigate } from "react-router-dom";

export function PromoResultAdd() {
  const [promotionId, setPromotionId] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const [announcementDate, setAnnouncementDate] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState(""); // 회원 검색어 상태 추가
  const [winners, setWinners] = useState([]);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setIsSubmitButtonDisabled(winners.length === 0);
  }, [winners]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("/api/promotion/list-all");
        setPromotions(response.data.promotionList);
      } catch (error) {
        console.error("Failed to fetch promotions", error);
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

    fetchPromotions();
    fetchMembers();
  }, []);

  const handlePromotionChange = (promotionId) => {
    const selectedPromo = promotions.find(
      (promo) => promo.id === parseInt(promotionId),
    );
    if (selectedPromo) {
      setPromotionId(promotionId);
      setAnnouncementDate(selectedPromo.eventEndDate);
    } else {
      setPromotionId("");
      setAnnouncementDate("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPromo = promotions.find(
      (promo) => promo.id === parseInt(promotionId),
    );
    if (!selectedPromo) {
      toast({
        title: "프로모션을 선택해 주세요.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post("/api/promotion/eventResult", {
        promotionId: selectedPromo.id,
        eventType: selectedPromo.eventType,
        eventName: selectedPromo.title,
        announcementDate: selectedPromo.eventEndDate,
        winners: winners.map(({ email, nickName }) => ({ email, nickName })),
      });
      toast({
        title: "당첨자 발표가 추가되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/promotion/eventResult");
    } catch (error) {
      console.error(
        "Error adding promo result:",
        error.response?.data || error.message,
      );
      toast({
        title: "추가 중 오류가 발생하였습니다.",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      toast({
        title: "이메일과 닉네임을 선택해 주세요.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleRemoveWinner = (index) => {
    const newWinners = winners.filter((_, i) => i !== index);
    setWinners(newWinners);
  };

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.eventType.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredMembers = members.filter(
    (member) =>
      member.email.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      member.nickName.toLowerCase().includes(memberSearchQuery.toLowerCase()),
  );

  return (
    <Center>
      <CenterBox>
        <Heading textAlign="center">당첨자 발표 추가</Heading>
        <Box width="100%">
          <form onSubmit={handleSubmit}>
            <Flex mb={4}>
              <FormControl id="promotionId" isRequired mr={4}>
                <FormLabel>프로모션 선택</FormLabel>
                <Select
                  placeholder="프로모션을 선택하세요"
                  value={promotionId}
                  onChange={(e) => handlePromotionChange(e.target.value)}
                >
                  {filteredPromotions.map((promo) => (
                    <option key={promo.id} value={promo.id}>
                      {promo.title} - {promo.eventType} - {promo.eventEndDate}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="searchQuery">
                <FormLabel>프로모션 검색</FormLabel>
                <Input
                  placeholder="프로모션을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </FormControl>
            </Flex>
            <Flex mb={4}>
              <FormControl id="member" mr={4} isRequired>
                <FormLabel>이메일과 닉네임 선택</FormLabel>
                <Select
                  placeholder="당첨자를 선택하세요"
                  value={
                    selectedMember
                      ? `${selectedMember.email} (${selectedMember.nickName})`
                      : ""
                  }
                  onChange={(e) => {
                    const [email, nickName] = e.target.value.split(" (");
                    setSelectedMember(
                      members.find(
                        (member) =>
                          member.email === email &&
                          member.nickName === nickName.slice(0, -1),
                      ),
                    );
                  }}
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
                <FormLabel>회원 검색</FormLabel>
                <Input
                  placeholder="이메일 또는 닉네임을 입력하세요"
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                />
              </FormControl>
            </Flex>
            <Button colorScheme="green" onClick={handleAddWinner}>
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
            >
              추가하기
            </Button>
          </form>
        </Box>
      </CenterBox>
    </Center>
  );
}
