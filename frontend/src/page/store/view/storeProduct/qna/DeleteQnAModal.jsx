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
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeleteQnAModal({ itemQnAId, listQnARefresh }) {
  const toast = useToast();
  function handleQnADelete(id) {
    axios
      .delete(`/api/store/product/qna/delete/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: "문의 글 삭제 성공",
          position: "bottom-right",
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
          <Badge
            color={"white"}
            bgColor={"red.500"}
            _hover={{
              bgColor: "red.600",
            }}
            _dark={{
              bgColor: "red.700",
              _hover: {
                color: "whiteAlpha.900",
                bgColor: "red.600",
              },
            }}
            color={"white"}
            cursor={"pointer"}
          >
            <FontAwesomeIcon icon={faX} />
          </Badge>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            <Flex gap={3}>
              <Text>삭제 하시겠습니까? </Text>
              <Badge
                color={"white"}
                bgColor={"red.500"}
                _hover={{
                  bgColor: "red.600",
                }}
                _dark={{
                  bgColor: "red.700",
                  _hover: {
                    color: "whiteAlpha.900",
                    bgColor: "red.600",
                  },
                }}
                onClick={() => handleQnADelete(itemQnAId)}
                cursor={"pointer"}
              >
                확인
              </Badge>
            </Flex>
          </PopoverHeader>
          <PopoverCloseButton />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DeleteQnAModal;
