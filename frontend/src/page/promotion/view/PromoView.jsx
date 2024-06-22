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
  const [promo, setPromo] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const { data } = await axios.get(`/api/promotion/${promoId}`);
        setPromo(data);
      } catch (err) {
        if (err.response?.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/promotion");
        }
      }
    };

    fetchPromotion();
  }, [promoId, navigate, toast]);

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/promotion/${promoId}`);
      toast({
        status: "success",
        description: `${promoId}번 게시물이 삭제되었습니다.`,
        position: "top",
      });
      navigate("/promotion");
    } catch {
      toast({
        status: "error",
        description: `${promoId}번 게시물 삭제 중 오류가 발생하였습니다.`,
        position: "top",
      });
    } finally {
      onClose();
    }
  };

  if (!promo) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>{promo.title}</Heading>
      <Box>
        <Text>
          <strong>이벤트 타입 |</strong> {promo.eventType}
        </Text>
        <Text>
          <strong>기간 |</strong>{" "}
          {new Date(promo.eventStartDate).toLocaleDateString()} ~{" "}
          {new Date(promo.eventEndDate).toLocaleDateString()}
        </Text>
        <Text>
          <strong>이벤트 상태 |</strong> {promo.eventStatus}
        </Text>
      </Box>
      <Box m={1} borderBottom={"1px solid black"} />
      <Box mt={4}>
        {promo.fileList?.slice(1).map((file) => (
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
            <Button colorScheme={"red"} onClick={handleRemove}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
