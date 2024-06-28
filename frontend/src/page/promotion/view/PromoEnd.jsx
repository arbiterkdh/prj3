import {
  Box,
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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import PromoPagination from "../component/PromoPagination.jsx";
import PromoeventTypeLabels from "../component/PromoeventTypeLabels.jsx";
import PromoSearchBar from "../component/PromoSearchBar.jsx"; // 추가된 import

export function PromoEnd() {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [promoSearch, setPromoSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchPromotions = (searchTerm, page) => {
    const query = searchTerm ? `&search=${searchTerm}` : "";
    axios
      .get(`/api/promotion/list?page=${page}&pageSize=15&type=ended${query}`)
      .then((res) => {
        setPromoList((prevList) => [...prevList, ...res.data.promotionList]);
        setPageInfo(res.data.pageInfo);
      })
      .catch((error) => {
        console.error("프로모션 데이터 가져오기 에러:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPromotions(promoSearch, page);
  }, [searchParams, promoSearch, page]);

  useEffect(() => {
    setPromoSearch(""); // 위치가 변경될 때 검색 상태 초기화
  }, [location]);

  if (loading && page === 1) {
    return <Spinner />;
  }

  function handleTableClick(promoId) {
    navigate(`/promotion/view/${promoId}`);
  }

  const handleSearch = (searchTerm) => {
    setSearchParams({ page: 1, search: searchTerm });
    setPromoList([]); // 기존 리스트 초기화
    setPage(1); // 페이지를 1로 리셋
    fetchPromotions(searchTerm, 1); // Perform search when the search term changes
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\.$/, "");
  };

  return (
    <Center>
      <CenterBox>
        <Box width="100%" textAlign="center">
          <Heading cursor={"pointer"} onClick={() => navigate("")}>
            종료 이벤트
          </Heading>
          <Box height="30px" />
          <Text>
            -응모하신 이벤트의 당첨 여부는 당첨자발표의 결과 확인을 통해
            확인하실 수 있습니다.
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
            {promoList.length === 0 ? (
              <Text>해당 이벤트가 없습니다.</Text>
            ) : (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th width={"20%"}>이벤트 이미지</Th>
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
                          <Text color="gray.500">
                            <PromoeventTypeLabels eventType={promo.eventType} />
                          </Text>
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
            )}
          </Box>
          <PromoPagination pageInfo={pageInfo} onLoadMore={handleLoadMore} />
        </Box>
      </CenterBox>
    </Center>
  );
}
