import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function PromoEdit() {
  const { id } = useParams();
  const [promo, setPromo] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleEditClick() {
    axios
      .putForm("/api/promotion/edit", {
        title,
        eventType,
        eventStartDate,
        eventEndDate,
        content,
        files,
      })
      .then((res) => {
        toast({
          status: "success",
          description: `${promo.id}번 게시물이 수정되었습니다.`,
          position: "top",
        });
        navigate(`/promotion/${promo.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description:
              "게시물이 수정되지 않았습니다. 입력한 내용을 확인하세요.",
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  return (
    <Box>
      <Box>
        <Box>{promo.id}번 게시물 수정</Box>
        <Box>
          <FormControl>
            <FormLabel>이벤트 제목</FormLabel>
            <Input
              onChange={(e) => setPromo({ ...promo, title: e.target.value })}
              placeholder="제목을 입력하세요."
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>이벤트 타입</FormLabel>
            <Select
              onChange={(e) =>
                setPromo({ ...promo, eventType: e.target.value })
              }
              placeholder="이벤트 타입을 선택하세요."
              value={eventType}
            >
              <option value="movie">영화</option>
              <option value="theater">극장</option>
              <option value="membership">멤버십</option>
              <option value="discount">제휴/할인</option>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>시작일</FormLabel>
            <Input
              type={"date"}
              onChange={(e) =>
                setPromo({ ...promo, eventStartDate: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>종료일</FormLabel>
            <Input
              type={"date"}
              onChange={(e) =>
                setPromo({ ...promo, eventEndDate: e.target.value })
              }
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>사진파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setPromo({ ...promo, files: e.target.files })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>이벤트 설명</FormLabel>
            <Textarea
              onChange={(e) => setPromo({ ...promo, content: e.target.value })}
              placeholder="설명을 입력하세요."
            />
          </FormControl>
          <Button colorScheme="teal" onClick={onClose}>
            저장
          </Button>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>저장하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button mr={2} onClick={onClose}>
                취소
              </Button>
              <Button onClick={handleEditClick} colorScheme={"blue"}>
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
