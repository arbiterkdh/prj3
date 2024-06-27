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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MovieComment } from "./comment/MovieComment.jsx";
import { useContext } from "react";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import ColorButton from "../../../../css/theme/component/button/ColorButton.jsx";

export function MovieInfo({ movie, isProcessing, setIsProcessing }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

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
      <Box w={"100%"}>
        <Stack>
          <Box>
            <p style={{ whiteSpace: "pre-wrap", marginBottom: "50px" }}>
              {movie.content}
            </p>
          </Box>
          <Divider border={"1px solid lightgray"} />
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
          <Box mb={10}>
            <Text> 출연진 : {movie.actors}</Text>
          </Box>
        </Stack>
        {account.isAdmin() && (
          <Flex justifyContent={"flex-end"} mb={"50px"}>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              onClick={handleModifyClick}
            >
              수정
            </Button>
            <ColorButton onClick={onOpen}>삭제</ColorButton>
          </Flex>
        )}
        <Divider border={"1px solid lightgray"} />
        <MovieComment
          movieId={movie.id}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              onClick={onClose}
            >
              취소
            </Button>
            <ColorButton onClick={handleRemoveClick}>삭제</ColorButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
