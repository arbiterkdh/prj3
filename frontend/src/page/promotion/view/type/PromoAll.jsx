import { Box, Heading, Spinner } from "@chakra-ui/react";
import { PromoList } from "../../list/PromoList.jsx";
import ShowMoreButton from "../../../../css/theme/component/button/ShowMoreButton.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PromoCarousel from "../../component/PromoCarousel.jsx";

export function PromoAll() {
  const navigate = useNavigate();
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendedList, setRecommendedList] = useState([]);

  useEffect(() => {
    const fetchAllPromotions = async () => {
      try {
        const { data } = await axios.get(`/api/promotion/list-all`);
        const now = new Date();
        const activePromos = data.promotionList.filter(
          (promo) => new Date(promo.eventEndDate) >= now,
        );
        setPromoList(activePromos);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedPromotions = async () => {
      try {
        const { data } = await axios.get(`/api/promotion/recommendations`);
        setRecommendedList(data.recommendations);
      } catch (error) {
        console.error("Error fetching recommended promotions:", error);
      }
    };

    fetchAllPromotions();
    fetchRecommendedPromotions();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const renderPromoSection = (title, eventType) => (
    <Box mb={50}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading mt={5} style={{ whiteSpace: "nowrap" }} fontSize="25px">
          {title}
        </Heading>
        <ShowMoreButton
          buttonOnclick={() => navigate(`/promotion/${eventType}`)}
        />
      </Box>
      <PromoList
        eventType={eventType}
        eventStatusList={promoList.filter(
          (promo) => promo.eventType === eventType,
        )}
        maxItems={4}
        showTotalPosts={false}
        showSearch={false}
        showPagination={false}
      />
    </Box>
  );

  return (
    <Box>
      <Box mb={50} />
      <Heading>추천 이벤트</Heading>
      <Box mb={50}>
        <PromoCarousel promoList={recommendedList} />
      </Box>
      {renderPromoSection("영화", "movie")}
      {renderPromoSection("극장", "theater")}
      {renderPromoSection("멤버십", "membership")}
      {renderPromoSection("제휴/할인", "discount")}
    </Box>
  );
}
