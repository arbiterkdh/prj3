import { Box, Heading } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";
import AddMoreButton from "../../../css/theme/component/button/AddMoreButton.jsx";
import { useNavigate } from "react-router-dom";

export function PromoAll() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          영화
        </Heading>
        <AddMoreButton buttonOnclick={() => navigate("/promotion/movie")} />
      </Box>
      <PromoList eventType={"극장"} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          극장
        </Heading>
        <AddMoreButton buttonOnclick={() => navigate("/promotion/theater")} />
      </Box>
      <PromoList eventType={"극장"} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          멤버십
        </Heading>
        <AddMoreButton
          buttonOnclick={() => navigate("/promotion/membership")}
        />
      </Box>
      <PromoList eventType={"멤버십"} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          제휴/할인
        </Heading>
        <AddMoreButton buttonOnclick={() => navigate("/promotion/discount")} />
      </Box>
      <PromoList eventType={"제휴/할인"} />
    </Box>
  );
}
