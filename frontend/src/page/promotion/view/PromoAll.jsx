import { Box, Heading } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";
import ShowMoreButton from "../../../css/theme/component/button/ShowMoreButton.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function PromoAll() {
  let navigate = useNavigate();
  const [promoList, setPromoList] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/promotion/list?${searchParams}`)
      .then((res) => setPromoList(res.data));
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          영화
        </Heading>
        <ShowMoreButton buttonOnclick={() => navigate("/promotion/movie")} />
      </Box>
      <PromoList eventType={"영화"} maxItems={3} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          극장
        </Heading>
        <ShowMoreButton buttonOnclick={() => navigate("/promotion/theater")} />
      </Box>
      <PromoList eventType={"극장"} maxItems={3} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          멤버십
        </Heading>
        <ShowMoreButton
          buttonOnclick={() => navigate("/promotion/membership")}
        />
      </Box>
      <PromoList eventType={"멤버십"} maxItems={3} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          제휴/할인
        </Heading>
        <ShowMoreButton buttonOnclick={() => navigate("/promotion/discount")} />
      </Box>
      <PromoList eventType={"제휴/할인"} maxItems={3} />
    </Box>
  );
}
