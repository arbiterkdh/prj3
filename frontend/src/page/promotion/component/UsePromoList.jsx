import { useEffect, useState } from "react";
import axios from "axios";

const usePromoList = (eventType, search, page, pageSize) => {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    currentPageNumber: 1,
    lastPageNumber: 1,
    totalItems: 0,
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
        setPromoList((prevList) => [
          ...prevList,
          ...response.data.promotionList,
        ]);
        setPageInfo(response.data.pageInfo);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventType, search, page, pageSize]);

  return { promoList, loading, pageInfo, setPromoList };
};

export default usePromoList;
