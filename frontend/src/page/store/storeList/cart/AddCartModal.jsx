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

function AddCartModal({
  isCartOpen,
  onCartClose,
  productId,
  fileName,
  price,
  quantity,
  name,
}) {
  const toast = useToast();
  function handleCartAdd(productId) {
    console.log("fileName:" + fileName);
    axios
      .postForm(`/api/store/cart/add`, {
        id: productId,
        name,
        fileName,
        price,
        quantity,
      })
      .then(() => {
        toast({
          status: "success",
          description: "장바구니 담기 완료",
          position: "bottom",
        });
      })
      .catch(() => {})
      .finally(() => {
        onCartClose();
      });
  }

  return (
    <>
      <Modal isOpen={isCartOpen} onClose={onCartClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>카트 담기</ModalHeader>
          <ModalBody>{name}상품을 담으시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => {
                  handleCartAdd(productId, name, fileName, price, quantity);
                }}
                colorScheme={"green"}
              >
                확인
              </Button>
              <Button onClick={onCartClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCartModal;
