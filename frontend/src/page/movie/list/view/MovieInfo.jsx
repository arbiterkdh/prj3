import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MovieComment } from "./comment/MovieComment.jsx";

export function MovieInfo({ movie, isProcessing, setIsProcessing }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  if (Object.entries(movie).length === 0) {
    return null;
  }

  function handleRemoveClick() {
    axios
      .delete(`/api/movie/delete/${movie.id}`)
      .then(() => navigate("/movie"));
  }

  function handleModifyClick() {
    navigate(`/movie/modify/${movie.id}`);
  }

  let index = 0;

  function ShowType(type, index) {
    let str;
    str = type;
    if (index < movie.type.length - 1) {
      str = str + ", ";
    }
    return (
      <Text mr={1} key={index}>
        {str}
      </Text>
    );
  }

  return (
    <Center>
      <CenterBox>
        <Stack>
          <Box>
            <p style={{ whiteSpace: "pre-wrap", marginBottom: "50px" }}>
              {movie.content}
            </p>
          </Box>
          <Divider />
          <Box mt={10}>
            <Flex>
              <Text mr={2}>상영타입 : </Text>
              {movie.type.map((type, index) => ShowType(type, index))}
            </Flex>
          </Box>
          <Box>
            <Flex gap={2} height={"20px"}>
              <Text>감독 : {movie.director}</Text>
              <Divider orientation="vertical" />
              <Text>
                장르 : {movie.genre} / {movie.runningTime} 분
              </Text>
              <Divider orientation="vertical" />
              <Text> 등급 : {movie.rating}</Text>
              <Divider orientation="vertical" />
              <Text> 개봉일 : {movie.startDate}</Text>
            </Flex>
          </Box>
          <Box>
            <Text> 출연진 : {movie.actors}</Text>
          </Box>
        </Stack>
        <Flex justifyContent={"flex-end"} mb={"50px"}>
          <Button onClick={handleModifyClick} colorScheme={"blue"}>
            수정
          </Button>
          <Button onClick={onOpen} colorScheme={"red"}>
            삭제
          </Button>
        </Flex>
        <Divider />
        <MovieComment
          movieId={movie.id}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </CenterBox>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleRemoveClick} colorScheme={"red"}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
