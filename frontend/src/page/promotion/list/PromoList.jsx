import { Box, Flex, SimpleGrid, Spacer, Spinner, Text } from "@chakra-ui/react";
import PromoSearchBar from "../component/PromoSearchBar.jsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PromoCard from "../component/PromoCard.jsx";
import PromoPagination from "../component/PromoPagination.jsx";
import usePromoList from "../component/UsePromoList.jsx";

export function PromoList({
  eventType: propEventType,
  eventStatusList,
  maxItems,
  showTotalPosts = true,
  showSearch = true,
  showPagination = true,
}) {
  const [promoSearch, setPromoSearch] = useState("");
  const eventType = propEventType || useParams().eventType;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { promoList, loading, pageInfo } = usePromoList(
    eventType === "all" ? "" : eventType,
    eventStatusList,
    promoSearch,
  );

  const filteredPromoList =
    eventType !== "all"
      ? promoList.filter((promo) => promo.eventType === eventType)
      : promoList;

  const displayedPromos = maxItems
    ? filteredPromoList.slice(0, maxItems)
    : filteredPromoList;

  const handleSearch = (searchTerm) => {
    setSearchParams({ page: 1, search: searchTerm });
    setPromoSearch(searchTerm);
  };

  useEffect(() => {
    const searchTerm = searchParams.get("search") || "";
    setPromoSearch(searchTerm);
  }, [searchParams]);

  if (loading) {
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
      {displayedPromos.length === 0 ? (
        <Text textAlign="center" mt={5} p={10}>
          해당 이벤트가 없습니다.
        </Text>
      ) : (
        <SimpleGrid
          spacing={6} // 간격을 줄이려면 이 값을 줄이세요
          templateColumns="repeat(auto-fill, minmax(226px, 1fr))"
          mb={6}
        >
          {displayedPromos.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </SimpleGrid>
      )}
      {showPagination && (
        <Box mt={6}>
          <PromoPagination pageInfo={pageInfo} eventType={eventType} />
        </Box>
      )}
    </Box>
  );
}
