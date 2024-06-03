import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";

export function StoreAdd() {
  return (
    <Box>
      <Box>
        <Heading>상품등록 페이지</Heading>
      </Box>

      <hr />
      <Box>
        <Box></Box>
        <FormControl isRequired>
          <FormLabel>상품 이미지</FormLabel>
          <Input type={"file"} placeholder="상품 이미지 등록하세요" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>상품명</FormLabel>
          <Input placeholder="상품명을 작성하세요" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>가격</FormLabel>
          <Input placeholder="상품 이미지등록하세요" />
        </FormControl>

        <FormControl isRequiredd>
          <FormLabel>상세내용</FormLabel>
          <Textarea></Textarea>
        </FormControl>

        <Flex>
          <Button>등록</Button>
        </Flex>
      </Box>
    </Box>
  );
}
