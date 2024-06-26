import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SampleNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "gray",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" style={{ color: "white" }}></i>
    </div>
  );
};

const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "gray",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" style={{ color: "white" }}></i>
    </div>
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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\.$/, "");
  };

  return (
    <Slider {...settings}>
      {recommendedPromos.map((promo) => (
        <Box
          key={promo.id}
          onClick={() => navigate(`/promotion/view/${promo.id}`)}
          p={2}
          cursor="pointer"
        >
          {promo.isRecommended === true && promo.fileList?.length > 0 ? (
            <Image
              src={promo.fileList[0]?.src}
              alt={promo.title}
              borderRadius="md"
            />
          ) : (
            promo.fileList?.length > 0 && (
              <Image
                src={promo.fileList[0]?.src}
                alt={promo.title}
                borderRadius="md"
              />
            )
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
      ))}
    </Slider>
  );
};

export default PromoCarousel;
