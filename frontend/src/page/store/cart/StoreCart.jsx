import {
  Alert,
  AlertDescription,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import CenterTh from "../../../css/theme/component/table/thead/tr/th/CenterTh.jsx";
import axios from "axios";
import CenterTd from "../../../css/theme/component/table/thead/tr/td/CenterTd.jsx";
import Payment from "../payment/Payment.jsx";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { ModifyCartModal } from "./ModifyCartModal.jsx";
import { CartContext } from "../../../component/CartProvider.jsx";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";

export function StoreCart() {
  const [productCartList, setProductCartList] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [checkItem, setCheckItem] = useState({});

  const [changeQuantity, setChangeQuantity] = useState(1);
  const [changeTotalPrice, setChangeTotalPrice] = useState(1);

  const [isDisabled, setIsDisabled] = useState(false);

  const { setCartCount } = useContext(CartContext);
  const Login = useContext(LoginContext);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartId, setCartId] = useState(null);

  const account = useContext(LoginContext);
  const {
    isOpen: isModifyOpen,
    onOpen: onModifyOpen,
    onClose: onModifyClose,
  } = useDisclosure();

  const {
    isOpen: isPayOpen,
    onOpen: onPayOpen,
    onClose: onPayClose,
  } = useDisclosure();

  const updateQuantity = (productId, quantityItem) => {
    setProductCartList((itemList) =>
      itemList.map((item) =>
        item.productId === productId
          ? { ...item, quantity: quantityItem }
          : item,
      ),
    );
  };

  useEffect(() => {
    if (account.id) {
      axios
        .get(`/api/store/cart/list/${account.id}`)
        .then((res) => {
          const initialAllCheck = res.data.reduce((itemArr, item) => {
            itemArr[item.productId] = true;
            return itemArr;
          }, {});
          setProductCartList(res.data);
          setCheckItem(initialAllCheck);
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [account, setCartCount]);

  const handleCheckBoxChange = (productId) => {
    setCheckItem((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  function handleItemDelete(productId) {
    setIsLoading(true);
    axios
      .delete(`/api/store/cart/delete/${Login.id}/${productId}`)
      .then((res) => {
        toast({
          status: "success",
          description: "삭제 완료",
          position: "bottom-right",
        });
        setProductCartList((cartList) =>
          cartList.filter((item) => item.productId !== productId),
        );

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
        setIsLoading(false);
        onClose();
      });
  }

  function CartItem({ cartItem }) {
    return (
      <>
        <Tr>
          <CenterTd>
            <Checkbox
              isChecked={checkItem[cartItem.productId]}
              onChange={() => handleCheckBoxChange(cartItem.productId)}
              ml={"3px"}
              _checked={{
                "& .chakra-checkbox__control": {
                  backgroundColor: "#ff4357",
                  borderColor: "#ff4357",
                  _hover: {
                    backgroundColor: "#ff4357",
                  },
                },
              }}
            ></Checkbox>
          </CenterTd>
          <CenterTd>
            <Image src={cartItem.image.src}></Image>
          </CenterTd>
          <CenterTd>{cartItem.name}</CenterTd>
          <CenterTd>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Button
                onClick={() => {
                  if (cartItem.quantity > 1) {
                    updateQuantity(cartItem.productId, cartItem.quantity - 1);
                  }
                  setChangeQuantity(cartItem.quantity - 1);
                  setChangeTotalPrice((cartItem.quantity - 1) * cartItem.price);
                  setIsDisabled(true);
                }}
              >
                -
              </Button>
              <Text>{cartItem.quantity}</Text>
              <Button
                onClick={() => {
                  updateQuantity(cartItem.productId, cartItem.quantity + 1);
                  setChangeQuantity(cartItem.quantity + 1);
                  setChangeTotalPrice((cartItem.quantity + 1) * cartItem.price);
                  setIsDisabled(true);
                }}
              >
                +
              </Button>
            </Flex>
          </CenterTd>
          <CenterTd>{cartItem.price}원</CenterTd>
          <CenterTd>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              onClick={() => {
                onModifyOpen();
                setCartId(cartItem.id);
                setIsDisabled(false);
              }}
            >
              변경
            </Button>
          </CenterTd>
          <CenterTd>
            <ColorButton
              onClick={() => {
                onOpen();
                setProductId(cartItem.productId);
                setProductName(cartItem.name);
              }}
            >
              삭제
            </ColorButton>
          </CenterTd>
          <CenterTd>{cartItem.regDate}</CenterTd>
        </Tr>
      </>
    );
  }

  const ProductCartList = () => {
    if (productCartList.length === 0) {
      return (
        <Tr>
          <Td w={"100%"} colSpan={"8"} textAlign={"center"}>
            카트에 등록된 상품이 없습니다
          </Td>
        </Tr>
      );
    }
    return (
      <>
        {productCartList.map((cartItem) => (
          <CartItem key={cartItem.productId} cartItem={cartItem} />
        ))}
      </>
    );
  };

  const totalSum = productCartList.reduce(
    (sum, item) =>
      checkItem[item.productId] ? sum + item.price * item.quantity : sum,
    0,
  );

  const totalSelectItem = productCartList.reduce(
    (count, item) => (checkItem[item.productId] ? count + 1 : count),
    0,
  );

  const checkCartId = () => {
    return productCartList
      .filter((item) => checkItem[item.productId])
      .map((item) => item.id);
  };

  return (
    <Center>
      <CenterBox>
        <Box>
          <Heading>카트</Heading>
        </Box>
        <Box>
          <hr />
        </Box>
        <TableContainer mb={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <CenterTh w={"10%"}>
                  <Checkbox
                    ml={"3px"}
                    _checked={{
                      "& .chakra-checkbox__control": {
                        backgroundColor: "#ff4357",
                        borderColor: "#ff4357",
                        _hover: {
                          backgroundColor: "#ff4357",
                        },
                      },
                    }}
                    isChecked={productCartList.every(
                      (item) => checkItem[item.productId],
                    )}
                    onChange={() => {
                      const allChecked = productCartList.every(
                        (item) => checkItem[item.productId],
                      );
                      const newCheckItem = productCartList.reduce(
                        (itemArr, item) => {
                          itemArr[item.productId] = !allChecked;
                          return itemArr;
                        },
                        {},
                      );
                      setCheckItem(newCheckItem);
                    }}
                  ></Checkbox>
                </CenterTh>
                <CenterTh w={"20%"}>이미지</CenterTh>
                <CenterTh w={"20%"}>상품명</CenterTh>
                <CenterTh w={"10%"}>수량</CenterTh>
                <CenterTh w={"10%"}>가격</CenterTh>
                <CenterTh w={"10%"}>수정</CenterTh>
                <CenterTh w={"10%"}>삭제</CenterTh>
                <CenterTh w={"20%"}>날짜</CenterTh>
              </Tr>
            </Thead>
            <Tbody>
              <ProductCartList />
            </Tbody>
          </Table>
        </TableContainer>
        <Box mb={3}>
          <Box mb={10}>
            <Heading>최종 결제 금액</Heading>
          </Box>
          <Alert
            status="info"
            border={"1px solid #f2efef"}
            bgColor={"#f2efef"}
            _dark={{
              border: "1px solid #2d4c4c",
              bgColor: "#2d4c4c",
            }}
            borderRadius={"10px"}
          >
            <Flex m={10} justifyContent={"flex-end"} w={"100%"}>
              {/*<AlertIcon />*/}
              <AlertDescription>
                <Text fontSize={"1.3rem"}>
                  총 {totalSelectItem}개의 상품금액 = 합계 {totalSum}원
                </Text>
              </AlertDescription>
            </Flex>
          </Alert>
        </Box>

        <Payment
          totalSum={totalSum}
          productCartList={productCartList}
          checkCartId={checkCartId()}
          isDisabled={isDisabled}
          onPayClose={onPayClose}
        />
        <ModifyCartModal
          isModifyOpen={isModifyOpen}
          onModifyClose={onModifyClose}
          cartId={cartId}
          changeQuantity={changeQuantity}
          changeTotalPrice={changeTotalPrice}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent _dark={{ bgColor: "#1F3032" }}>
            <ModalHeader>장바구니 알림</ModalHeader>
            <ModalBody>{productName}을 삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Flex>
                <ColorButton
                  onClick={() => handleItemDelete(productId)}
                  colorScheme={"red"}
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
                  onClick={onClose}
                >
                  취소
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CenterBox>
    </Center>
  );
}
