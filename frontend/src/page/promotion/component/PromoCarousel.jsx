import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const NextArrow = ({ onClick }) => {
  return (
    <IconButton
      icon={<FontAwesomeIcon icon={faChevronRight} />}
      onClick={onClick}
      position="absolute"
      top="45%"
      right="-5"
      transform="translateY(-60%)"
      color="whiteAlpha.900"
      bg="red.500"
      _hover={{ bg: "red.600" }}
      _active={{ bg: "red.800" }}
      _dark={{
        bg: "red.700",
        _hover: { bg: "red.600" },
        _active: { bg: "red.500" },
      }}
      borderRadius="40%"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      zIndex={1}
    />
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <IconButton
      icon={<FontAwesomeIcon icon={faChevronLeft} />}
      onClick={onClick}
      position="absolute"
      top="45%"
      left="-5"
      transform="translateY(-60%)"
      color="whiteAlpha.900"
      bg="red.500"
      _hover={{ bg: "red.600" }}
      _active={{ bg: "red.800" }}
      _dark={{
        bg: "red.700",
        _hover: { bg: "red.600" },
        _active: { bg: "red.500" },
      }}
      borderRadius="40%"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      zIndex={1}
    />
  );
};

const PromoCarousel = () => {
  const [recommendedPromos, setRecommendedPromos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedPromos = async () => {
      try {
        const { data } = await axios.get("/api/promotion/recommendations");
        setRecommendedPromos(data);
      } catch (error) {
        console.error("Error fetching recommended promotions:", error);
      }
    };

    fetchRecommendedPromos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\.$/, "");
  };

  return (
    <Slider {...settings}>
      {recommendedPromos.map((promo) => {
        const recommendedFile = promo.fileList.find(
          (file) => file.fileType === "recommended",
        );

        return (
          <Box
            key={promo.id}
            onClick={() => navigate(`/promotion/view/${promo.id}`)}
            p={2}
            cursor="pointer"
          >
            {recommendedFile && (
              <Image
                src={recommendedFile.filePath}
                alt={promo.title}
                borderRadius="lg"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.9)"
              />
            )}
            <Box p={2}>
              <Flex alignItems="center">
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  isTruncated
                  maxWidth="calc(100% - 150px)"
                  display="inline-block"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {promo.title}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  whiteSpace="nowrap"
                  display="inline-block"
                  marginLeft="auto"
                >
                  {formatDate(promo.eventStartDate)} ~{" "}
                  {formatDate(promo.eventEndDate)}
                </Text>
              </Flex>
            </Box>
          </Box>
        );
      })}
    </Slider>
  );
};

export default PromoCarousel;
