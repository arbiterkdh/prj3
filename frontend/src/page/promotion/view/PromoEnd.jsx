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
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import PromoPagination from "../component/PromoPagination.jsx";
import PromoeventTypeLabels from "../component/PromoeventTypeLabels.jsx";
import PromoSearchBar from "../component/PromoSearchBar.jsx";

export function PromoEnd() {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    currentPageNumber: 1,
    lastPageNumber: 1,
    totalItems: 0,
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [promoSearch, setPromoSearch] = useState("");

  const fetchPromotions = async (searchTerm, page, append = false) => {
    setLoading(true);
    const query = searchTerm ? `&search=${searchTerm}` : "";
    try {
      const res = await axios.get(
        `/api/promotion/list?page=${page}&pageSize=8&type=ended${query}`,
      );
      setPromoList((prevList) =>
        append
          ? [...prevList, ...res.data.promotionList]
          : res.data.promotionList,
      );
      setPageInfo(res.data.pageInfo);
    } catch (error) {
      console.error("프로모션 데이터 가져오기 에러:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchTerm = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page"), 10) || 1;
    setPromoSearch(searchTerm);
    fetchPromotions(searchTerm, page, page !== 1);
  }, [searchParams]);

  function handleTableClick(promoId) {
    navigate(`/promotion/view/${promoId}`);
  }

  const handleSearch = (searchTerm) => {
    setSearchParams({ page: 1, search: searchTerm });
  };

  const handleLoadMore = () => {
    const nextPage = pageInfo.currentPageNumber + 1;
    setSearchParams({ page: nextPage, search: promoSearch });
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
            -이벤트의 당첨 여부는 당첨자발표의 결과 확인을 통해 확인하실 수
            있습니다.
          </Text>
          <Box borderBottom={"2px solid black"} padding="20px" />
          <Flex>
            <Text fontWeight={"bold"} textAlign="left" mt={4} marginLeft="30px">
              전체 {pageInfo.totalItems}건
            </Text>
            <Spacer />
            <PromoSearchBar searchValue={promoSearch} onSearch={handleSearch} />
          </Flex>
          <Box border="1px solid #e2e8f0" borderRadius="8px" padding="20px">
            {promoList.length === 0 && !loading ? (
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
                              src={
                                promo.fileList.find(
                                  (file) => file.fileType === "thumbnail",
                                )?.filePath || promo.fileList[0].filePath
                              }
                              alt="이벤트 이미지"
                              width="100"
                              height="100"
                            />
                          )}
                        </Td>
                        <Td>
                          <Text fontWeight="bold">{promo.title}</Text>
                          <Text color="gray.500" mt={2}>
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
          {loading && <Spinner />}
          <PromoPagination pageInfo={pageInfo} onLoadMore={handleLoadMore} />
        </Box>
      </CenterBox>
    </Center>
  );
}
