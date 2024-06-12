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
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function PromoModify() {
  const { promoId } = useParams();
  const [promo, setPromo] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/promotion/${promoId}`)
      .then((res) => setPromo(res.data))
      .catch(() => {})
      .finally(() => {});
  }, []);

  function handleModifyClick() {
    axios
      .put("/api/promotion/modify", promo)
      .then(() => {
        toast({
          status: "success",
          description: `${promo.id}번 게시물이 수정되었습니다.`,
          position: "top",
        });
        navigate(`/promotion/view/${promo.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description:
              "게시물이 수정되지 않았습니다. 작성한 내용을 확인해주세요.",
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (promo === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>
        <Box>{promo.id}번 게시물 수정</Box>
        <Box>
          <FormControl>
            <FormLabel>이벤트 제목</FormLabel>
            <Input
              defaultValue={promo.title}
              onChange={(e) => setPromo({ ...promo, title: e.target.value })}
              placeholder="제목을 입력하세요."
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>이벤트 타입</FormLabel>
            <Select
              defaultValue={promo.eventType}
              onChange={(e) =>
                setPromo({ ...promo, eventType: e.target.value })
              }
              placeholder="이벤트 타입을 선택하세요."
            >
              <option value="영화">영화</option>
              <option value="극장">극장</option>
              <option value="멤버십">멤버십</option>
              <option value="제휴/할인">제휴/할인</option>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>시작일</FormLabel>
            <Input
              defaultValue={promo.eventStartDate}
              type={"date"}
              onChange={(e) =>
                setPromo({ ...promo, eventStartDate: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>종료일</FormLabel>
            <Input
              defaultValue={promo.eventEndDate}
              type={"date"}
              onChange={(e) =>
                setPromo({ ...promo, eventEndDate: e.target.value })
              }
            />
          </FormControl>
        </Box>
        {/*<Box>*/}
        {/*  <FormControl>*/}
        {/*    <FormLabel>사진파일</FormLabel>*/}
        {/*    <Input*/}
        {/*      multiple*/}
        {/*      type="file"*/}
        {/*      accept="image/*"*/}
        {/*      onChange={(e) => setPromo({ ...promo, files: e.target.files })}*/}
        {/*    />*/}
        {/*  </FormControl>*/}
        {/*</Box>*/}
        <Box>
          <FormControl>
            <FormLabel>이벤트 설명</FormLabel>
            <Textarea
              defaultValue={promo.content}
              onChange={(e) => setPromo({ ...promo, content: e.target.value })}
              placeholder="설명을 입력하세요."
            />
          </FormControl>
          <Button colorScheme="teal" onClick={onOpen}>
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
              <Button onClick={handleModifyClick} colorScheme={"blue"}>
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
