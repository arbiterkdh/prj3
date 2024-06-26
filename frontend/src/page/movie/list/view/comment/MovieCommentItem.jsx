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
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

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
    <Box
      mb={7}
      bgColor={"#f2efef"}
      border={"1px solid #f2efef"}
      _dark={{
        bgColor: "#2d4c4c",
        border: "1px solid #2d4c4c",
      }}
      borderRadius={"10px"}
    >
      <Flex p={2}>
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
        <Flex p={2} ml={2}>
          <Box flex={1}>
            <p style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</p>
          </Box>
          {account.hasAccess(comment.memberId) && (
            <Box alignContent={"end"}>
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={() => setIsEditing(true)}
              >
                수정
              </Button>
              <ColorButton onClick={onOpen} colorScheme={"red"}>
                삭제
              </ColorButton>
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
            <ColorButton isLoading={isProcessing} onClick={handleRemoveComment}>
              삭제
            </ColorButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
