import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import StoreMenuText from "../../../css/theme/component/text/StoreMenuText.jsx";
import StoreMenuCursorBox from "../../../css/theme/component/box/StoreMenuCursorBox.jsx";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModifyProductModal from "./modify/ModifyProductModal.jsx";
import DeleteProductModal from "./delete/DeleteProductModal.jsx";
import ProductItemList from "./list/ProductItemList.jsx";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import AddCartModal from "./cart/AddCartModal.jsx";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";

export function StoreList() {
  const [productList, setProductList] = useState([]);
  const [menuTypeSelect, setMenuTypeSelect] = useState("best");
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

  const Login = useContext(LoginContext);

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

  const clicked = {
    variant: "solid",
    color: "white",
    bgColor: "#ff4357",
    _hover: {
      bgColor: "#ff7889",
    },
    _dark: {
      bgColor: "#ad303a",
      _hover: {
        bgColor: "#a86669",
      },
    },
  };

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
            </Flex>
          </Box>
          {Login.nickName === "생존코딩" && (
            <Box w={"50%"} textAlign={"right"}>
              <ColorButton
                size={"sm"}
                left={"5px"}
                top={"-15px"}
                colorScheme={"blue"}
                onClick={() => navigate("/store/add")}
              >
                상품등록
              </ColorButton>
            </Box>
          )}
        </Flex>
        <Flex
          w={"100%"}
          style={{
            textAlign: "center",
          }}
          p={2}
        >
          <StoreMenuCursorBox>
            <StoreMenuText onClick={() => setMenuTypeSelect("all")}>
              전체
            </StoreMenuText>
          </StoreMenuCursorBox>
          <StoreMenuCursorBox>
            <StoreMenuText onClick={() => setMenuTypeSelect("best")}>
              Best
            </StoreMenuText>
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

        <Box display="flex" justifyContent="center" my={4}>
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
              sx={pageNumber === pageInfo.currentPage ? clicked : {}}
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
        </Box>

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
