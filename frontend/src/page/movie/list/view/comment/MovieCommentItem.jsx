import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useState } from "react";
import * as PropTypes from "prop-types";
import { MovieCommentEdit } from "./MovieCommentEdit.jsx";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

MovieCommentEdit.propTypes = { setIsEditing: PropTypes.func };

export function MovieCommentItem({ comment, isProcessing, setIsProcessing }) {
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const account = useContext(LoginContext);

  function handleRemoveComment() {
    setIsProcessing(true);
    axios
      .delete(`/api/movie/comment/delete`, {
        data: { id: comment.id },
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Box border={"1px solid black"}>
      <Flex mb={1}>
        <Flex fontWeight={900}>
          <Box mr={3}>
            <FontAwesomeIcon icon={faUser} />
          </Box>
          <Text>{comment.nickName}</Text>
        </Flex>
        <Spacer />
        <Flex gap={2}>
          <Box>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Box>
          <Box>{comment.inserted}</Box>
        </Flex>
      </Flex>
      {isEditing || (
        <Flex ml={2} mb={2} alignItems="center">
          <p style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</p>
          <Spacer />
          {account.hasAccess(comment.memberId) && (
            <Box mb={-2}>
              <Button onClick={() => setIsEditing(true)} colorScheme={"blue"}>
                수정
              </Button>
              <Button onClick={onOpen} colorScheme={"red"}>
                삭제
              </Button>
            </Box>
          )}
        </Flex>
      )}
      {isEditing && (
        <MovieCommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>댓글삭제 확인</ModalHeader>
          <ModalBody>댓글을 삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              isLoading={isProcessing}
              onClick={handleRemoveComment}
              colorScheme={"red"}
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
