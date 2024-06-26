import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StoreMenuText from "../../../css/theme/component/text/StoreMenuText.jsx";
import StoreMenuCursorBox from "../../../css/theme/component/box/StoreMenuCursorBox.jsx";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCartModal from "./cart/AddCartModal.jsx";
import ModifyProductModal from "./modify/ModifyProductModal.jsx";
import DeleteProductModal from "./delete/DeleteProductModal.jsx";
import ProductItemList from "./list/ProductItemList.jsx";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";

export function StoreList() {
  const [productList, setProductList] = useState([]);
  const [menuTypeSelect, setMenuTypeSelect] = useState("all");
  const [pageInfo, setPageInfo] = useState({});
  const [productId, setProductId] = useState(0);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

  const {
    isOpen: isModifyOpen,
    onOpen: onModifyOpen,
    onClose: onModifyClose,
  } = useDisclosure();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  const {
    isOpen: isPayOpen,
    onOpen: onPayOpen,
    onClose: onPayClose,
  } = useDisclosure();

  const productListRefresh = () => {
    axios
      .get(`/api/store/product/list/${menuTypeSelect}`, {
        params: {
          page,
        },
      })
      .then((res) => {
        setProductList(res.data.productList);
        setPageInfo(res.data.pageInfo);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    productListRefresh();
  }, [menuTypeSelect, page]);

  const pageNumbers = [];

  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Center>
      <CenterBox mb={10}>
        <Flex>
          <Box w={"50%"}>
            <Flex alignItems={"center"}>
              <Heading>상품 리스트</Heading>
              <Text
                color={"red"}
                bgColor={"white"}
                _dark={{ bgColor: "#2d4c4c", color: "white" }}
                onClick={() => navigate("cart")}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  fontSize={"1.2rem"}
                  cursor={"pointer"}
                />
              </Text>
            </Flex>
          </Box>
          <Box w={"50%"} textAlign={"right"}>
            <Button
              onClick={() => navigate("/store/add")}
              bgColor={"#e73426"}
              _dark={{ bgColor: "#2d4c4c" }}
              color={"white"}
            >
              상품등록
            </Button>
          </Box>
        </Flex>

        <Flex
          w={"100%"}
          style={{
            textAlign: "center",
          }}
          p={7}
        >
          <StoreMenuCursorBox>
            <StoreMenuText onClick={() => setMenuTypeSelect("all")}>
              전체
            </StoreMenuText>
          </StoreMenuCursorBox>
          <StoreMenuCursorBox>
            <StoreMenuText>Best</StoreMenuText>
          </StoreMenuCursorBox>
          <StoreMenuCursorBox onClick={() => setMenuTypeSelect(1)}>
            <StoreMenuText>세트</StoreMenuText>
          </StoreMenuCursorBox>
          <StoreMenuCursorBox>
            <StoreMenuText onClick={() => setMenuTypeSelect(2)}>
              팝콘
            </StoreMenuText>
          </StoreMenuCursorBox>
          <StoreMenuCursorBox>
            <StoreMenuText onClick={() => setMenuTypeSelect(3)}>
              간식
            </StoreMenuText>
          </StoreMenuCursorBox>
          <StoreMenuCursorBox>
            <StoreMenuText onClick={() => setMenuTypeSelect(4)}>
              드링크
            </StoreMenuText>
          </StoreMenuCursorBox>
        </Flex>

        <Box mb={3}>
          <hr />
        </Box>

        <ProductItemList
          productList={productList}
          onCartOpen={onCartOpen}
          setProductId={setProductId}
          productId={productId}
          setFileName={setFileName}
          setName={setName}
          name={name}
          setPrice={setPrice}
          price={price}
          setStock={setStock}
          setQuantity={setQuantity}
          quantity={quantity}
          image={image}
          setImage={setImage}
          onDelOpen={onDelOpen}
          onModifyOpen={onModifyOpen}
          isPayOpen={isPayOpen}
          onPayOpen={onPayOpen}
          onPayClose={onPayClose}
        />

        {pageInfo.prevPageNumber && (
          <>
            <Button onClick={() => setPage(1)}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </Button>
            <Button onClick={() => setPage(pageInfo.prevPageNumber)}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          </>
        )}

        {pageNumbers.map((pageNumber) => (
          <Button
            onClick={() => {
              setPage(pageNumber);
            }}
            key={pageNumber}
            colorScheme={pageNumber === pageInfo.currentPage ? "blue" : "gray"}
          >
            {pageNumber}
          </Button>
        ))}

        {pageInfo.nextPageNumber && (
          <>
            <Button onClick={() => setPage(pageInfo.nextPageNumber)}>
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
            <Button onClick={() => setPage(pageInfo.rightPageNumber)}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          </>
        )}

        <DeleteProductModal
          isDelOpen={isDelOpen}
          onDelClose={onDelClose}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          productId={productId}
          setProductList={setProductList}
          productList={productList}
        />

        <ModifyProductModal
          isModifyOpen={isModifyOpen}
          onModifyOpen={onModifyOpen}
          productId={productId}
          fileName={fileName}
          name={name}
          setName={setName}
          stock={stock}
          setStock={setStock}
          price={price}
          setPrice={setPrice}
          file={file}
          setFile={setFile}
          image={image}
          isLoading={isLoading}
          onModifyClose={onModifyClose}
          productListRefresh={productListRefresh}
        />

        <AddCartModal
          isCartOpen={isCartOpen}
          onCartClose={onCartClose}
          productId={productId}
          fileName={fileName}
          price={price}
          quantity={quantity}
          name={name}
        />
      </CenterBox>
    </Center>
  );
}
