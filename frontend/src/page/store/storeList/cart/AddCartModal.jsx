import React, { useContext } from "react";
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
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import { CartContext } from "../../../../component/CartProvider.jsx";
import ColorButton from "../../../../css/theme/component/button/ColorButton.jsx";

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
  const Login = useContext(LoginContext);

  const { setCartCount } = useContext(CartContext);
  function handleCartAdd(productId) {
    console.log("fileName:" + fileName);
    axios
      .postForm(`/api/store/cart/add`, {
        id: productId,
        name,
        fileName,
        price,
        quantity,
        memberNumber: Login.id,
      })
      .then(() => {
        toast({
          status: "success",
          description: "장바구니 담기 완료",
          position: "bottom-right",
        });
        if (Login.id) {
          axios
            .get(`/api/store/cart/totalCount/${Login.id}`)
            .then((res) => {
              setCartCount(res.data);
            })
            .catch(() => {})
            .finally(() => {});
        }
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
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>카트 담기</ModalHeader>
          <ModalBody>{name}상품을 담으시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <ColorButton
                onClick={() => {
                  handleCartAdd(productId, name, fileName, price, quantity);
                }}
              >
                확인
              </ColorButton>
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={onCartClose}
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

export default AddCartModal;
