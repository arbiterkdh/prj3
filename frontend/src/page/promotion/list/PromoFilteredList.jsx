import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PromoList } from "./PromoList";

export function PromoFilteredList({ eventType, maxItems }) {
  const [promoList, setPromoList] = useState([]);
  const { eventTypeParam } = useParams();
  const eventTypeFilter = eventType || eventTypeParam;

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promoListResponse = await axios.get("/api/promotion/list");
        const promoListData = promoListResponse.data;

        // Fetch promo details in parallel
        const promoDetailsData = await Promise.all(
          promoListData.map(async (promo) => {
            const response = await axios.get(`/api/promotion/${promo.id}`);
            return { ...promo, details: response.data };
          }),
        );

        setPromoList(promoDetailsData);
      } catch (error) {
        console.error("프로모션 데이터 가져오기 에러:", error);
      }
    };

    fetchPromotions();
  }, []);

  const filteredPromoList = eventTypeFilter
    ? promoList.filter((promo) => promo.eventType === eventTypeFilter)
    : promoList;

  const displayedPromos = maxItems
    ? filteredPromoList.slice(0, maxItems)
    : filteredPromoList;

  return <PromoList promoList={displayedPromos} />;
}
