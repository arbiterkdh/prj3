import {
  Box,
  Center,
  Heading,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function PromoEnd() {
  const [promoList, setPromoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/promotion/list`)
      .then((res) => {
        const now = new Date();
        const endedPromos = res.data.filter(
          (promo) => new Date(promo.eventEndDate) < now,
        );
        setPromoList(endedPromos);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);
  // useEffect(() => {
  //   axios.get(`/api/promotion/list`).then((res) => setPromoList(res.data));
  // }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  if (promoList === null) {
    return <Spinner />;
  }

  function handleTableClick(promoId) {
    navigate(`/promotion/view/${promoId}`);
  }

  return (
    <Center>
      <CenterBox>
        <Box width="100%" textAlign="center">
          <Heading>종료 이벤트</Heading>
          <Box height="30px" />
          <Text>
            -응모하신 이벤트의 당첨 여부는 당첨자발표의 나의 응모결과 확인을
            통해 확인하실 수 있습니다.
          </Text>
          <Box borderBottom={"2px solid black"} padding="20px" />
          <Box border="1px solid #e2e8f0" borderRadius="8px" padding="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th width={"10%"}>이벤트 이미지</Th>
                    <Th>이벤트 정보</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {promoList.map((promo) => (
                    <Tr
                      key={promo.id}
                      onClick={() => handleTableClick(promo.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Td width={"15%"}>
                        {promo.fileList && promo.fileList.length > 0 && (
                          <Image
                            src={promo.fileList[0].src}
                            alt="이벤트 이미지"
                            width="100"
                            height="100"
                          />
                        )}
                      </Td>
                      <Td>
                        <Text fontWeight="bold">{promo.title}</Text>
                        <Text color="gray.500">{promo.eventType}</Text>
                        <Text color="gray.500">
                          {formatDate(promo.eventStartDate)} ~{" "}
                          {formatDate(promo.eventEndDate)}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </CenterBox>
    </Center>
  );
}
