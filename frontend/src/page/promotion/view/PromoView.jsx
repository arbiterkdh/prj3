import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function PromoView() {
  const { promoId } = useParams();
  const [promo, setPromo] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/promotion/${promoId}`)
      .then((res) => setPromo(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/promotion");
        }
      })
      .finally(() => {});
  }, [promoId, navigate, toast]);

  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return "예정 이벤트";
    } else if (now >= start && now <= end) {
      return "진행 중인 이벤트";
    } else {
      return "종료된 이벤트";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  function handleClickRemove() {
    axios
      .delete(`/api/promotion/${promoId}`)
      .then(() => {
        toast({
          status: "success",
          description: `${promoId}번 게시물이 삭제되었습니다.`,
          position: "top",
        });
        navigate("/promotion");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `${promoId}번 게시물 삭제 중 오류가 발생하였습니다.`,
          position: "top",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  if (promo === null) {
    return <Spinner />;
  }

  const eventStatus = getEventStatus(promo.eventStartDate, promo.eventEndDate);

  return (
    <Box>
      <Heading>{promo.title}</Heading>
      <Box>
        <Text>
          <strong>이벤트 타입:</strong> {promo.eventType}
        </Text>
        <Text>
          <strong>이벤트 시작일:</strong> {formatDate(promo.eventStartDate)}
        </Text>
        <Text>
          <strong>이벤트 종료일:</strong> {formatDate(promo.eventEndDate)}
        </Text>
        <Text>
          <strong>이벤트 상태:</strong> {eventStatus}
        </Text>
      </Box>
      <Box mt={4}>
        {promo.fileList &&
          promo.fileList.map((file) => (
            <Box key={file.name}>
              <Image src={file.src} />
            </Box>
          ))}
      </Box>
      <Box mt={4}>
        <Text>{promo.content}</Text>
      </Box>
      <Button
        colorScheme={"purple"}
        onClick={() => navigate(`/promotion/modify/${promo.id}`)}
      >
        수정
      </Button>
      <Button colorScheme={"red"} onClick={onOpen}>
        삭제
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button colorScheme={"red"} onClick={handleClickRemove}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
