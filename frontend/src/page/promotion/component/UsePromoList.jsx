import { useEffect, useState } from "react";
import axios from "axios";

const usePromoList = (eventType, eventStatusList, search, page, pageSize) => {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    currentPageNumber: 1,
    lastPageNumber: 1,
    totalItems: 0,
    leftPageNumber: 1,
    rightPageNumber: 1,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/promotion/list`, {
        params: {
          page,
          pageSize,
          type: eventType,
          search,
        },
      })
      .then((response) => {
        setPromoList(response.data.promotionList);
        setPageInfo(response.data.pageInfo);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventType, search, page, pageSize]);

  return { promoList, loading, pageInfo };
};

export default usePromoList;
