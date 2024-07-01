import { Box, Flex, SimpleGrid, Spacer, Spinner, Text } from "@chakra-ui/react";
import PromoSearchBar from "../component/PromoSearchBar.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PromoCard from "../component/PromoCard.jsx";
import usePromoList from "../component/UsePromoList.jsx";
import PromoPagination from "../component/PromoPagination.jsx";

export function PromoList({
  eventType: propEventType,
  eventStatusList,
  maxItems = 20,
  showTotalPosts = true,
  showSearch = true,
  showPagination = true,
  pageSize = 20,
}) {
  const eventType = propEventType || useParams().eventType;
  const [searchParams, setSearchParams] = useSearchParams();
  const [promoSearch, setPromoSearch] = useState(
    searchParams.get("search") || "",
  );
  const [page, setPage] = useState(parseInt(searchParams.get("page"), 10) || 1);
  const { promoList, loading, pageInfo, setPromoList } = usePromoList(
    eventType === "all" ? "" : eventType,
    promoSearch,
    page,
    pageSize,
  );

  useEffect(() => {
    setPromoList([]);
  }, [promoSearch, setPromoList]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchParams({});
      setPromoSearch("");
    } else {
      setSearchParams({ page: 1, search: searchTerm });
      setPromoSearch(searchTerm);
    }
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const searchTerm = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page"), 10) || 1;
    setPromoSearch(searchTerm);
    setPage(currentPage);
  }, [searchParams]);

  if (loading && page === 1) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex>
        {showTotalPosts && (
          <Text as={"b"} mt={5} ml={"20px"}>
            전체 {pageInfo.totalItems}건
          </Text>
        )}
        <Spacer />
        {showSearch && (
          <PromoSearchBar searchValue={promoSearch} onSearch={handleSearch} />
        )}
      </Flex>
      {promoList.length === 0 ? (
        <Text textAlign="center" mt={5} p={10}>
          해당 이벤트가 없습니다.
        </Text>
      ) : (
        <SimpleGrid spacing={6} templateColumns="repeat(4, 1fr)" mb={6}>
          {promoList.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </SimpleGrid>
      )}
      {showPagination &&
        pageInfo.currentPageNumber < pageInfo.lastPageNumber && (
          <PromoPagination
            pageInfo={pageInfo}
            eventType={eventType}
            onLoadMore={handleLoadMore}
          />
        )}
    </Box>
  );
}

export default PromoList;
