import {
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
  const [addDetailFiles, setAddDetailFiles] = useState([]);
  const [addRecommendedFiles, setAddRecommendedFiles] = useState([]);
  const [addThumbnailFiles, setAddThumbnailFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/promotion/${promoId}`).then((res) => setPromo(res.data));
  }, [promoId]);

  const handleFileChange = (event, setFiles) => {
    const files = Array.from(event.target.files);
    const existingFileNames = promo.fileList.map((file) => file.fileName);
    const newFiles = [];
    const duplicates = [];

    files.forEach((file) => {
      if (existingFileNames.includes(file.name)) {
        duplicates.push(file.name);
      } else {
        newFiles.push(file);
      }
    });

    setFiles(newFiles);
    setDuplicateFiles(duplicates);
  };

  function handleModifyClick() {
    const formData = new FormData();
    formData.append("id", promo.id);
    formData.append("title", promo.title);
    formData.append("eventType", promo.eventType);
    formData.append("eventStartDate", promo.eventStartDate);
    formData.append("eventEndDate", promo.eventEndDate);
    formData.append("content", promo.content);

    removeFileList.forEach((file) => formData.append("removeFileList[]", file));
    addDetailFiles.forEach((file) => formData.append("addDetailFiles", file));
    addRecommendedFiles.forEach((file) =>
      formData.append("addRecommendedFiles", file),
    );
    addThumbnailFiles.forEach((file) =>
      formData.append("addThumbnailFiles", file),
    );

    axios
      .put("/api/promotion/modify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
    <Box display="flex" justifyContent="center" py={6}>
      <Box
        width="70%"
        maxWidth="800px"
        border="2px solid"
        borderColor="blue.300"
        borderRadius="10px"
        p={6}
        boxShadow="md"
        bg="white"
      >
        <Box mb={4} textAlign="center" fontWeight="bold" fontSize="xl">
          {promo.id}번 게시물 수정
        </Box>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <FormControl flex="7" mr={2}>
            <FormLabel fontWeight="bold" fontSize="lg">
              이벤트 제목
            </FormLabel>
            <Input
              defaultValue={promo.title}
              onChange={(e) => setPromo({ ...promo, title: e.target.value })}
              placeholder="제목을 입력하세요."
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <FormControl flex="3" mr={2}>
            <FormLabel fontWeight="bold" fontSize="lg">
              시작일
            </FormLabel>
            <Input
              defaultValue={promo.eventStartDate}
              type="date"
              onChange={(e) =>
                setPromo({ ...promo, eventStartDate: e.target.value })
              }
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            />
          </FormControl>
          <FormControl flex="3" mr={2}>
            <FormLabel fontWeight="bold" fontSize="lg">
              종료일
            </FormLabel>
            <Input
              defaultValue={promo.eventEndDate}
              type="date"
              onChange={(e) =>
                setPromo({ ...promo, eventEndDate: e.target.value })
              }
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            />
          </FormControl>
          <FormControl flex="2">
            <FormLabel fontWeight="bold" fontSize="lg">
              이벤트 타입
            </FormLabel>
            <Select
              defaultValue={promo.eventType}
              onChange={(e) =>
                setPromo({ ...promo, eventType: e.target.value })
              }
              placeholder="선택"
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            >
              <option value="movie">영화</option>
              <option value="theater">극장</option>
              <option value="membership">멤버십</option>
              <option value="discount">제휴/할인</option>
            </Select>
          </FormControl>
        </Box>
        <Box mb={4}>
          {promo.fileList &&
            promo.fileList.map((file) => (
              <Box
                border="2px solid black"
                borderRadius="md"
                p={3}
                mb={3}
                key={file.fileName}
              >
                <Flex alignItems="center">
                  <FontAwesomeIcon icon={faTrashCan} cursor="pointer" />
                  <Switch
                    onChange={(e) =>
                      handleRemoveSwitchChange(file.fileName, e.target.checked)
                    }
                    ml={3}
                  />
                  <Text ml={3}>{file.fileName}</Text>
                </Flex>
                <Box mt={2}>
                  <Image
                    sx={
                      removeFileList.includes(file.fileName)
                        ? { filter: "blur(8px)" }
                        : {}
                    }
                    src={file.filePath}
                    borderRadius="md"
                  />
                </Box>
              </Box>
            ))}
        </Box>
        <Box mb={4}>
          <FormControl>
            <FormLabel fontWeight="bold" fontSize="lg">
              추가할 추천 이미지 파일 (추가시 기존 파일삭제바람)
            </FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setAddRecommendedFiles)}
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontWeight="bold" fontSize="lg">
              추가할 썸네일 이미지 파일 (추가시 기존 파일삭제바람)
            </FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setAddThumbnailFiles)}
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontWeight="bold" fontSize="lg">
              추가할 상세 이미지 파일
            </FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setAddDetailFiles)}
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            />
          </FormControl>
          <ul mt={2}>
            {Array.from(addRecommendedFiles).map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
            {Array.from(addThumbnailFiles).map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
            {Array.from(addDetailFiles).map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
            {duplicateFiles.map((file) => (
              <li key={file} style={{ color: "red" }}>
                {file} (중복 파일)
              </li>
            ))}
          </ul>
        </Box>
        <Box mb={4}>
          <FormControl>
            <FormLabel fontWeight="bold" fontSize="lg">
              이벤트 설명
            </FormLabel>
            <Textarea
              defaultValue={promo.content}
              onChange={(e) => setPromo({ ...promo, content: e.target.value })}
              placeholder="설명을 입력하세요."
              borderColor="gray.300"
              focusBorderColor="blue.300"
              _hover={{ borderColor: "blue.300" }}
            />
          </FormControl>
        </Box>
        <Button
          colorScheme="teal"
          onClick={onOpen}
          width="100%"
          fontSize="lg"
          py={6}
        >
          저장
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>저장하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button mr={2} onClick={onClose}>
                취소
              </Button>
              <Button onClick={handleModifyClick} colorScheme="blue">
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
