import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";
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

  return (
    <Slider {...settings}>
      {recommendedPromos.map((promo) => (
        <Box
          key={promo.id}
          onClick={() => navigate(`/promotion/view/${promo.id}`)}
        >
          <Image
            src={promo.fileList[0]?.src}
            alt={promo.title}
            cursor="pointer"
          />
        </Box>
      ))}
    </Slider>
  );
};

export default PromoCarousel;
