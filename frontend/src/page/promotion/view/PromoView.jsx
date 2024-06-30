import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
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
import PromoeventTypeLabels from "../component/PromoeventTypeLabels.jsx";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export function PromoView() {
  const { promoId } = useParams();
  const [promo, setPromo] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const account = useContext(LoginContext);

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

  const handleAddRecommendation = async () => {
    try {
      await axios.put(`/api/promotion/${promoId}/add-recommendation`);
      toast({
        status: "success",
        description: `${promoId}번 게시물이 추천 이벤트로 추가되었습니다.`,
        position: "top",
      });
      navigate("/promotion/all");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          status: "warning",
          description: "이미 추천 이벤트에 추가되었습니다.",
          position: "top",
        });
      } else {
        toast({
          status: "error",
          description: `${promoId}번 게시물 추천 이벤트 추가 중 오류가 발생하였습니다.`,
          position: "top",
        });
      }
    }
  };

  const handleRemoveRecommendation = async () => {
    try {
      await axios.put(`/api/promotion/${promoId}/remove-recommendation`);
      toast({
        status: "success",
        description: `${promoId}번 게시물이 추천 이벤트에서 삭제되었습니다.`,
        position: "top",
      });
      navigate("/promotion/all");
    } catch (error) {
      toast({
        status: "error",
        description: `${promoId}번 게시물 추천 이벤트 삭제 중 오류가 발생하였습니다.`,
        position: "top",
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\.$/, "");
  };

  if (!promo) {
    return <Spinner />;
  }

  return (
    <Center>
      <CenterBox>
        <Box>
          <Heading>{promo.title}</Heading>
          <Box>
            <Flex justifyContent="space-between" alignItems="center" mt={4}>
              <Text>
                <strong>기간 |</strong> {formatDate(promo.eventStartDate)} ~{" "}
                {formatDate(promo.eventEndDate)}
              </Text>
              <Text color="gray.500">
                <PromoeventTypeLabels eventType={promo.eventType} />
              </Text>
            </Flex>
          </Box>
          <Box m={1} borderBottom={"1px solid black"} />
          <Box mt={4}>
            {promo.fileList
              ?.filter((file) => file.fileType === "detail")
              .map((file) => (
                <Box key={file.fileName} mb={4}>
                  <Image src={file.filePath} alt={file.fileName} />
                </Box>
              ))}
          </Box>
          <Box mt={4}>
            <Text>{promo.content}</Text>
          </Box>
          {account.isAdmin() && (
            <Box>
              <Button onClick={() => navigate(`/promotion/modify/${promo.id}`)}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: "#366ece" }}
                />
              </Button>
              <Button onClick={onOpen}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "#db0f0f" }}
                />
              </Button>
              <Button onClick={handleAddRecommendation}>
                추천 이벤트
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button onClick={handleRemoveRecommendation}>
                추천 이벤트
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Box>
          )}
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
      </CenterBox>
    </Center>
  );
}
