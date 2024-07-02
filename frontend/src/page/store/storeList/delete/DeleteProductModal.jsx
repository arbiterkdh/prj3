import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import ColorButton from "../../../../css/theme/component/button/ColorButton.jsx";

function DeleteProductModal({
  isDelOpen,
  onDelClose,
  isLoading,
  setIsLoading,
  productId,
  setProductList,
  productList,
}) {
  const toast = useToast();
  function handleProductDelete() {
    setIsLoading(true);

    axios
      .delete(`/api/store/product/delete/${productId}`)
      .then((res) => {
        toast({
          status: "success",
          description: "삭제 성공",
          position: "bottom-right",
        });
        setProductList(
          productList.filter((product) => product.id !== productId),
        );
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        onDelClose();
      });
  }

  return (
    <>
      <Modal isOpen={isDelOpen} onClose={onDelClose}>
        <ModalOverlay />
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>알림</ModalHeader>
          <ModalBody>상품을 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <ColorButton
                colorScheme={"green"}
                onClick={handleProductDelete}
                isLoading={isLoading}
              >
                확인
              </ColorButton>
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={onDelClose}
              >
                취소
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteProductModal;
