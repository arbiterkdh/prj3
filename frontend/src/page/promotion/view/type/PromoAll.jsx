import { Box, Heading, Spinner } from "@chakra-ui/react";
import { PromoList } from "../../list/PromoList.jsx";
import ShowMoreButton from "../../../../css/theme/component/button/ShowMoreButton.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PromoCarousel from "../../component/PromoCarousel.jsx";

export function PromoAll() {
  const navigate = useNavigate();
  const [moviePromos, setMoviePromos] = useState([]);
  const [theaterPromos, setTheaterPromos] = useState([]);
  const [membershipPromos, setMembershipPromos] = useState([]);
  const [discountPromos, setDiscountPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendedList, setRecommendedList] = useState([]);

  useEffect(() => {
    const fetchPromotions = async (type, setState) => {
      try {
        const { data } = await axios.get(`/api/promotion/list`, {
          params: {
            page: 1,
            pageSize: 4, // 각 타입별로 4개씩 가져옴
            type,
          },
        });
        const now = new Date();
        const activePromos = data.promotionList.filter(
          (promo) => new Date(promo.eventEndDate) >= now,
        );
        setState(activePromos);
      } catch (error) {
        console.error(`Error fetching ${type} promotions:`, error);
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

    fetchPromotions("movie", setMoviePromos);
    fetchPromotions("theater", setTheaterPromos);
    fetchPromotions("membership", setMembershipPromos);
    fetchPromotions("discount", setDiscountPromos);
    fetchRecommendedPromotions();

    setLoading(false);
  }, []);

  const renderPromoSection = (title, promos, eventType) => (
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
        eventStatusList={promos}
        maxItems={4}
        showTotalPosts={false}
        showSearch={false}
        showPagination={false}
        pageSize={4} // 페이지 사이즈를 4로 설정
      />
    </Box>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box mb={20} />
      <Heading>추천 이벤트</Heading>
      <Box mb={50}>
        <PromoCarousel promoList={recommendedList} />
      </Box>
      {renderPromoSection("영화", moviePromos, "movie")}
      {renderPromoSection("극장", theaterPromos, "theater")}
      {renderPromoSection("멤버십", membershipPromos, "membership")}
      {renderPromoSection("제휴/할인", discountPromos, "discount")}
    </Box>
  );
}
