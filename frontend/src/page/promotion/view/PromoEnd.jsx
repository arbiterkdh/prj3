import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import PromoSearchBar from "../PromoSearchBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PromoEnd() {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [promoSearch, setPromoSearch] = useState("");

  useEffect(() => {
    const currentPage = searchParams.get("page") || 1;
    const query = promoSearch ? `&search=${promoSearch}` : "";
    axios
      .get(`/api/promotion/list?page=${currentPage}&type=ended${query}`)
      .then((res) => {
        setPromoList(res.data.promotionList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((error) => {
        console.error("프로모션 데이터 가져오기 에러:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, promoSearch]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  if (loading) {
    return <Spinner />;
  }

  function handleTableClick(promoId) {
    navigate(`/promotion/view/${promoId}`);
  }

  const handleSearch = (searchTerm) => {
    setPromoSearch(searchTerm);
  };

  return (
    <Center>
      <CenterBox>
        <Box width="100%" textAlign="center">
          <Heading>종료 이벤트</Heading>
          <Box height="30px" />
          <Text>
            -응모하신 이벤트의 당첨 여부는 당첨자발표의 나의 응모결과 확인을
            통해 확인하실 수 있습니다.
          </Text>
          <Box borderBottom={"2px solid black"} padding="20px" />
          <Flex>
            <Text fontWeight={"bold"} textAlign="left" mt={4} marginLeft="30px">
              전체 {pageInfo.totalItems}건
            </Text>
            <Spacer />
            <PromoSearchBar onSearch={handleSearch} />
          </Flex>
          <Box border="1px solid #e2e8f0" borderRadius="8px" padding="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th width={"10%"}>이벤트 이미지</Th>
                    <Th>이벤트 정보</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {promoList.map((promo) => (
                    <Tr
                      key={promo.id}
                      onClick={() => handleTableClick(promo.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Td width={"15%"}>
                        {promo.fileList && promo.fileList.length > 0 && (
                          <Image
                            src={promo.fileList[0].src}
                            alt="이벤트 이미지"
                            width="100"
                            height="100"
                          />
                        )}
                      </Td>
                      <Td>
                        <Text fontWeight="bold">{promo.title}</Text>
                        <Text color="gray.500">{promo.eventType}</Text>
                        <Text color="gray.500">
                          {formatDate(promo.eventStartDate)} ~{" "}
                          {formatDate(promo.eventEndDate)}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Center>
              {pageInfo.prevPageNumber && (
                <>
                  <Button
                    onClick={() => navigate(`/promotion/eventEnd?page=1`)}
                  >
                    <FontAwesomeIcon icon={faAnglesLeft} />
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(
                        `/promotion/eventEnd?page=${pageInfo.prevPageNumber}`,
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </Button>
                </>
              )}
              {pageNumbers.map((pageNumber) => (
                <Button
                  onClick={() =>
                    navigate(`/promotion/eventEnd?page=${pageNumber}`)
                  }
                  key={pageNumber}
                  colorScheme={
                    pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
                  }
                >
                  {pageNumber}
                </Button>
              ))}
              {pageInfo.nextPageNumber && (
                <>
                  <Button
                    onClick={() =>
                      navigate(
                        `/promotion/eventEnd?page=${pageInfo.nextPageNumber}`,
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(
                        `/promotion/eventEnd?page=${pageInfo.lastPageNumber}`,
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </Button>
                </>
              )}
            </Center>
          </Box>
        </Box>
      </CenterBox>
    </Center>
  );
}
