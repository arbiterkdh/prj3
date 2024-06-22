import React from "react";
import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
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
      <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} />
    </div>
  );
};

const PromoCarousel = ({ promoList }) => {
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
      {promoList.map((promo) => (
        <Box key={promo.id}>
          <Image
            src={promo.fileList?.length > 0 ? promo.fileList[0].src : ""}
            alt={promo.title}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default PromoCarousel;
