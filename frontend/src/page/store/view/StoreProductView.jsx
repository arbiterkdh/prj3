import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function StoreProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentWriter, setCommentWriter] = useState("");

  useEffect(() => {
    axios
      .get(`/api/store/product/view/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  function handleCommentAdd(id, commentContent, commentWriter) {
    axios.post("/api/store/product");
  }

  return (
    <Box>
      <Box>
        <hr />
      </Box>
      <Flex w={"100%"}>
        <Box w={"50%"} p={20}>
          <Image
            src={`http://127.0.0.1:8888/${product.id}/${product.fileName}`}
          />
        </Box>
        <Flex
          w={"50%"}
          p={20}
          style={{
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box padding={"10px"}>
            <Text fontSize="2xl">{product.name}</Text>
          </Box>
          <Box padding={"10px"}>
            <Text fontSize="md">남은 수량:{product.stock}</Text>
          </Box>
        </Flex>
      </Flex>

      <Box>
        <hr />
      </Box>

      <Box>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>상세내용</Tab>
            <Tab>코멘트</Tab>
            <Tab>문의</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Textarea
                fontSize={"xl"}
                value={product.content}
                style={{ resize: "none" }}
              ></Textarea>
            </TabPanel>
            <TabPanel>
              <Flex w={"100%"}>
                <Box w={"70%"} style={{}}>
                  <Box w={"100%"}>
                    <FormControl>
                      <FormLabel>한줄평</FormLabel>
                      <Input
                        color="teal"
                        placeholder="내용을 작성하세요"
                        _placeholder={{ opacity: 1, color: "gray.500" }}
                        onChange={(e) => setCommentContent(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  w={"30%"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Input onChange={(e) => setCommentWriter(e.target.value)} />
                  </Box>
                  <Box>
                    <Button
                      colorScheme={"red"}
                      onClick={() =>
                        handleCommentAdd(
                          product.id,
                          commentContent,
                          commentWriter,
                        )
                      }
                    >
                      확인
                    </Button>
                  </Box>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
              <p fontSize={"xl"}>문의</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
