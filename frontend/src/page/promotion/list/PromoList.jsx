import { Box, Flex, SimpleGrid, Spacer, Spinner, Text } from "@chakra-ui/react";
import PromoSearchBar from "../PromoSearchBar.jsx";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PromoCard from "../PromoCard.jsx";
import PromoPagination from "../PromoPagination.jsx";
import usePromoList from "../UsePromoList.jsx";

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
    setPromoSearch(searchTerm);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex>
        {showTotalPosts && (
          <Text as={"b"} mt={4} ml={"20px"}>
            전체 {pageInfo.totalItems}건
          </Text>
        )}
        <Spacer />
        {showSearch && <PromoSearchBar onSearch={handleSearch} />}
      </Flex>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {displayedPromos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </SimpleGrid>
      {showPagination && (
        <PromoPagination pageInfo={pageInfo} eventType={eventType} />
      )}
    </Box>
  );
}
