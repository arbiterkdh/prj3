import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const usePromoList = (eventType, eventStatusList, promoSearch) => {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPromotions = async () => {
      const currentPage = searchParams.get("page") || 1;
      const query = promoSearch ? `&search=${promoSearch}` : "";
      setLoading(true);

      try {
        if (eventStatusList) {
          setPromoList(eventStatusList);
        } else {
          const { data } = await axios.get(
            `/api/promotion/list?page=${currentPage}&type=${eventType}${query}`,
          );
          setPromoList(data.promotionList);
          setPageInfo(data.pageInfo);
        }
      } catch (error) {
        console.error("프로모션 데이터 가져오기 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [eventStatusList, searchParams, eventType, promoSearch]);

  return { promoList, loading, pageInfo };
};

export default usePromoList;
