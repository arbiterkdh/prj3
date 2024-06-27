import { Box, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoginModal } from "../component/LoginModal.jsx";

export function MemberLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [canShow, setCanShow] = useState(false);
  const [password, setPassword] = useState("");

  const [movieImages, setMovieImages] = useState([]);
  const [adImage, setAdImage] = useState("");

  useEffect(() => {
    axios
      .get("/api/movie/list")
      .then((res) => {
        const images = res.data.movieList.map(
          (movieItem) => movieItem.movieImageFile,
        );
        setMovieImages(images);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (isOpen && movieImages.length > 0) {
      const randomImage =
        movieImages[Math.floor(Math.random() * movieImages.length)];
      console.log(randomImage);
      setAdImage(
        randomImage.slice(-4) !== "null"
          ? randomImage
          : "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/default-ad-image.jpg",
      );
    }
  }, [isOpen, movieImages]);

  return (
    <Box>
      <Box onClick={onOpen}>로그인</Box>
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        canShow={canShow}
        setCanShow={setCanShow}
        password={password}
        setPassword={setPassword}
        adImage={adImage}
      />
    </Box>
  );
}
