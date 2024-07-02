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
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";

export function ModifyCartModal({
  isModifyOpen,
  onModifyClose,
  cartId,
  changeQuantity,
  changeTotalPrice,
}) {
  const toast = useToast();
  function handleModifyCart() {
    console.log(cartId);
    axios
      .put("/api/store/cart/modifyQuantity", {
        id: cartId,
        quantity: changeQuantity,
        totalPrice: changeTotalPrice,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "수정 완료",
          position: "bottom-right",
        });
      })
      .catch(() => {})
      .finally(() => {
        onModifyClose();
      });
  }

  return (
    <Modal isOpen={isModifyOpen} onClose={onModifyClose}>
      <ModalOverlay />
      <ModalContent _dark={{ bgColor: "#1F3032" }}>
        <ModalHeader>수량 변경 알림</ModalHeader>
        <ModalBody>수량을 변경하시겠습니까?</ModalBody>
        <ModalFooter>
          <Flex>
            <ColorButton onClick={handleModifyCart}>확인</ColorButton>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              onClick={onModifyClose}
            >
              취소
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
