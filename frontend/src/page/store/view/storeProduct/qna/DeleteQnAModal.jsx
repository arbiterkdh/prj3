import React from "react";
import axios from "axios";
import {
  Badge,
  Flex,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";

function DeleteQnAModal({ itemQnAId, listQnARefresh }) {
  const toast = useToast();
  function handleQnADelete(id) {
    axios
      .delete(`/api/store/product/qna/delete/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: "문의 글 삭제 성공",
          position: "bottom",
        });
        listQnARefresh();
      })
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Badge colorScheme={"red"}>삭제</Badge>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            <Flex>
              <Text>삭제 하시겠습니까?</Text>
              <Badge onClick={() => handleQnADelete(itemQnAId)}>확인</Badge>
            </Flex>
          </PopoverHeader>
          <PopoverCloseButton />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DeleteQnAModal;
