import { Box, Heading, Spinner } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";
import ShowMoreButton from "../../../css/theme/component/button/ShowMoreButton.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function PromoAll() {
  const navigate = useNavigate();
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    axios.get(`/api/promotion/list?type=all`).then((res) => {
      const now = new Date();
      const activePromos = res.data.promotionList.filter(
        (promo) => new Date(promo.eventEndDate) >= now,
      );
      setPromoList(activePromos);
      setPageInfo(res.data.pageInfo);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading mt={5} style={{ whiteSpace: "nowrap" }} fontSize="25px">
          영화
        </Heading>
        <ShowMoreButton buttonOnclick={() => navigate("/promotion/movie")} />
      </Box>
      <PromoList
        eventType={"movie"}
        eventStatusList={promoList.filter(
          (promo) => promo.eventType === "movie",
        )}
        maxItems={3}
        showTotalPosts={false}
        showSearch={false}
      />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          극장
        </Heading>
        <ShowMoreButton buttonOnclick={() => navigate("/promotion/theater")} />
      </Box>
      <PromoList
        eventType={"theater"}
        eventStatusList={promoList.filter(
          (promo) => promo.eventType === "theater",
        )}
        maxItems={3}
        showTotalPosts={false}
        showSearch={false}
      />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          멤버십
        </Heading>
        <ShowMoreButton
          buttonOnclick={() => navigate("/promotion/membership")}
        />
      </Box>
      <PromoList
        eventType={"membership"}
        eventStatusList={promoList.filter(
          (promo) => promo.eventType === "membership",
        )}
        maxItems={3}
        showTotalPosts={false}
        showSearch={false}
      />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          제휴/할인
        </Heading>
        <ShowMoreButton buttonOnclick={() => navigate("/promotion/discount")} />
      </Box>
      <PromoList
        eventType={"discount"}
        eventStatusList={promoList.filter(
          (promo) => promo.eventType === "discount",
        )}
        maxItems={3}
        showTotalPosts={false}
        showSearch={false}
      />
    </Box>
  );
}
