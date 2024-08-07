import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import ColorButton from "../../../../css/theme/component/button/ColorButton.jsx";

function ModifyProductModal({
  isModifyOpen,
  onModifyOpen,
  productId,
  fileName,
  name,
  setName,
  stock,
  setStock,
  price,
  setPrice,
  isLoading,
  onModifyClose,
  productListRefresh,
  file,
  setFile,
  image,
}) {
  const toast = useToast();

  const handleNumberInputChange = (value) => {
    setStock(value);
  };

  function handleProductModify(productId, name, price, file, stock) {
    axios
      .putForm(`/api/store/product/modify`, {
        productId,
        fileName,
        name,
        price,
        file,
        stock,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "수정 완료",
          position: "bottom-right",
        });
        productListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onModifyClose();
      });
  }

  return (
    <>
      <Modal isOpen={isModifyOpen} onClose={onModifyOpen}>
        <ModalOverlay />
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>상품 수정</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <Image src={image} />
              <input
                type={"file"}
                accept="image/*"
                placeholder={"이미지를 등록하세요"}
                id="file-input"
                className="file-input"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {/*{fileName}*/}
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>상품명</FormLabel>
              <Input
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Flex>
              <NumberInput
                clampValueOnBlur
                maxW="100px"
                mr="2rem"
                min={1}
                max={2000}
                value={stock}
                onChange={handleNumberInputChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex="1"
                focusThumbOnChange={false}
                value={stock}
                min={1}
                max={2000}
                onChange={handleNumberInputChange}
                // onChange={(e) => setStock(e.target.value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px">
                  {stock}
                </SliderThumb>
              </Slider>
            </Flex>

            <FormControl>
              <FormLabel>가격</FormLabel>
              <Input
                type={"number"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <ColorButton
                colorScheme={"green"}
                onClick={() =>
                  handleProductModify(productId, name, price, file, stock)
                }
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
                onClick={onModifyClose}
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

export default ModifyProductModal;
