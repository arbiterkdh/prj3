import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function PromoModify() {
  const { promoId } = useParams();
  const [promo, setPromo] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/promotion/${promoId}`).then((res) => setPromo(res.data));
  }, [promoId]);

  function handleModifyClick() {
    axios
      .putForm("/api/promotion/modify", {
        id: promo.id,
        title: promo.title,
        eventType: promo.eventType,
        eventStartDate: promo.eventStartDate,
        eventEndDate: promo.eventEndDate,
        content: promo.content,
        removeFileList,
        addFileList,
      })
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
        } else {
          toast({
            status: "error",
            description: "게시물 수정 중 오류가 발생하였습니다.",
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  const fileNameList = [];
  for (let addFile of addFileList) {
    // 이미 있는 파일과 중복된 파일명인지?
    let duplicate = false;
    for (let file of promo.fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <li key={addFile.name}>
        {addFile.name}
        {duplicate && <Badge colorScheme="red">override</Badge>}
      </li>,
    );
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...removeFileList, name]);
      toast({
        status: "info",
        description: `${name} 파일이 삭제 목록에 추가되었습니다.`,
        position: "top",
      });
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
      toast({
        status: "info",
        description: `${name} 파일이 삭제 목록에서 제거되었습니다.`,
        position: "top",
      });
    }
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
        <Box>
          {promo.fileList &&
            promo.fileList.map((file) => (
              <Box border={"2px solid black"} m={3} key={file.name}>
                <Flex>
                  <FontAwesomeIcon icon={faTrashCan} />
                  <Switch
                    onChange={(e) =>
                      handleRemoveSwitchChange(file.name, e.target.checked)
                    }
                  />
                  <Text>{file.name}</Text>
                </Flex>
                <Box>
                  <Image
                    sx={
                      removeFileList.includes(file.name)
                        ? { filter: "blur(8px)" }
                        : {}
                    }
                    src={file.src}
                  />
                </Box>
              </Box>
            ))}
        </Box>
        <Box>
          <FormControl>
            <FormLabel>사진파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setAddFileList(e.target.files)}
            />
          </FormControl>
          <ul>{fileNameList}</ul>
        </Box>
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
