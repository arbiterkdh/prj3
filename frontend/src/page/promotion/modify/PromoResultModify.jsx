import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";

export function PromoResultModify() {
  const { id } = useParams();
  const [announcementDate, setAnnouncementDate] = useState("");
  const [winnerEmail, setWinnerEmail] = useState("");
  const [winnerName, setWinnerName] = useState("");
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState(null); // 새로운 state 추가
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

    fetchPromotionResult();
  }, [id]);

  const handleAddWinner = () => {
    if (!winnerEmail || !winnerName) {
      toast({
        title: "이메일과 이름을 모두 입력해 주세요.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setWinners([...winners, { email: winnerEmail, name: winnerName }]);
    setWinnerEmail("");
    setWinnerName("");
  };

  const handleRemoveWinner = (index) => {
    const newWinners = winners.filter((_, i) => i !== index);
    setWinners(newWinners);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (winners.some((winner) => !winner.email || !winner.name)) {
      toast({
        title: "이메일과 이름을 모두 입력해 주세요.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

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

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center>
      <CenterBox>
        <Heading textAlign="center">당첨자 발표 수정</Heading>
        <Box width="100%">
          <form onSubmit={handleSubmit}>
            <FormControl id="promotion" mt={4}>
              <FormLabel>프로모션 선택</FormLabel>
              <Text>
                {promotion
                  ? `${promotion.eventName} - ${promotion.eventType} - ${announcementDate}`
                  : "로딩 중..."}
              </Text>
            </FormControl>
            <FormControl id="winnerEmail" mt={4}>
              <FormLabel>이메일</FormLabel>
              <Input
                value={winnerEmail}
                onChange={(e) => setWinnerEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="winnerName" mt={4}>
              <FormLabel>당첨자 이름</FormLabel>
              <Input
                value={winnerName}
                onChange={(e) => setWinnerName(e.target.value)}
              />
            </FormControl>
            <Button mt={4} colorScheme="green" onClick={handleAddWinner}>
              당첨자 추가
            </Button>
            <Table mt={4}>
              <Thead>
                <Tr>
                  <Th>이메일</Th>
                  <Th>당첨자 이름</Th>
                  <Th>삭제</Th>
                </Tr>
              </Thead>
              <Tbody>
                {winners.map((winner, index) => (
                  <Tr key={index}>
                    <Td>{winner.email}</Td>
                    <Td>{winner.name}</Td>
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
            <Button type="submit" colorScheme="blue" mt={6} width="full">
              수정하기
            </Button>
          </form>
        </Box>
      </CenterBox>
    </Center>
  );
}
