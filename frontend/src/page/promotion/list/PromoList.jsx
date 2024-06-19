import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function PromoList({
  eventType: propEventType,
  eventStatusList: getEventStatus,
  maxItems,
  showTotalPosts = true,
}) {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const { eventType: paramEventType } = useParams();
  const eventType = propEventType || paramEventType;
  const [searchParams] = useSearchParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const currentPage = searchParams.get("page") || 1;
    if (getEventStatus) {
      setPromoList(getEventStatus);
      setLoading(false);
    } else {
      axios
        .get(`/api/promotion/list?page=${currentPage}&type=${eventType}`)
        .then((res) => {
          setPromoList(res.data.promotionList);
          setPageInfo(res.data.pageInfo);
        })
        .catch((error) => {
          console.error("프로모션 데이터 가져오기 에러:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [getEventStatus, searchParams, eventType]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  const filteredPromoList = eventType
    ? promoList.filter((promo) => promo.eventType === eventType)
    : promoList;
  const displayedPromos = maxItems
    ? filteredPromoList.slice(0, maxItems)
    : filteredPromoList;

  function handleButtonClick(promoId) {
    navigate(`/promotion/view/${promoId}`);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      {showTotalPosts && (
        <Text as={"b"} mt={4} marginLeft={"20px"}>
          전체 {pageInfo.totalItems}건 {/* 전체 개수를 표시 */}
        </Text>
      )}
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {displayedPromos.map((promo) => (
          <Card key={promo.id} height="100%">
            <CardBody display="flex" flexDirection="column">
              <Box mt={4}>
                {promo.fileList && promo.fileList.length > 0 && (
                  <Box key={promo.fileList[0].name}>
                    <Image src={promo.fileList[0].src} />
                  </Box>
                )}
              </Box>
              <Box margin={3} flex={1}>
                <Heading as="b" mb={2}>
                  {promo.title}
                </Heading>
                <Text mb={2}>
                  {formatDate(promo.eventStartDate)} ~{" "}
                  {formatDate(promo.eventEndDate)}
                </Text>
              </Box>
              <CardFooter>
                <Button onClick={() => handleButtonClick(promo.id)}>
                  자세히 보기
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      <Box>
        <Center>
          {pageInfo.prevPageNumber && (
            <>
              <Button
                onClick={() => navigate(`/promotion/${eventType}?page=1`)}
              >
                <FontAwesomeIcon icon={faAnglesLeft} />
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    `/promotion/${eventType}?page=${pageInfo.prevPageNumber}`,
                  )
                }
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
            </>
          )}
          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() =>
                navigate(`/promotion/${eventType}?page=${pageNumber}`)
              }
              isActive={pageNumber === parseInt(searchParams.get("page"), 10)}
            >
              {pageNumber}
            </Button>
          ))}
          {pageInfo.nextPageNumber && (
            <>
              <Button
                onClick={() =>
                  navigate(
                    `/promotion/${eventType}?page=${pageInfo.nextPageNumber}`,
                  )
                }
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    `/promotion/${eventType}?page=${pageInfo.lastPageNumber}`,
                  )
                }
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </Button>
            </>
          )}
        </Center>
      </Box>
    </Box>
  );
}
