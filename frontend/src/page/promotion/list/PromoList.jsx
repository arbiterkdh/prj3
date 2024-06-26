import { Box, Flex, SimpleGrid, Spacer, Spinner, Text } from "@chakra-ui/react";
import PromoSearchBar from "../component/PromoSearchBar.jsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  const [promoSearch, setPromoSearch] = useState("");
  const eventType = propEventType || useParams().eventType;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [allPromos, setAllPromos] = useState([]);

  const { promoList, loading, pageInfo } = usePromoList(
    eventType === "all" ? "" : eventType,
    eventStatusList,
    promoSearch,
    page,
    pageSize,
  );

  useEffect(() => {
    if (!loading) {
      setAllPromos((prevPromos) => [...prevPromos, ...promoList]);
    }
  }, [promoList, loading]);

  const handleSearch = (searchTerm) => {
    setSearchParams({ page: 1, search: searchTerm });
    setPromoSearch(searchTerm);
    setPage(1);
    setAllPromos([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const searchTerm = searchParams.get("search") || "";
    setPromoSearch(searchTerm);
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
        {showSearch && <PromoSearchBar onSearch={handleSearch} />}
      </Flex>
      {allPromos.length === 0 ? (
        <Text textAlign="center" mt={5} p={10}>
          해당 이벤트가 없습니다.
        </Text>
      ) : (
        <SimpleGrid spacing={6} templateColumns="repeat(4, 1fr)" mb={6}>
          {allPromos.slice(0.4).map((promo) => (
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
