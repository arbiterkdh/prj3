import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoginModal } from "../component/LoginModal.jsx";

export function MemberLogin() {
  const [isNeedLogin, setIsNeedLogin] = useState(false);

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
    if (isNeedLogin && movieImages.length > 0) {
      const randomImage =
        movieImages[Math.floor(Math.random() * movieImages.length)];
      setAdImage(
        randomImage.slice(-4) !== "null"
          ? randomImage
          : "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/default-ad-image.jpg",
      );
    }
  }, [isNeedLogin, movieImages]);

  return (
    <Box>
      <Box onClick={() => setIsNeedLogin(true)}>로그인</Box>
      <LoginModal
        canShow={canShow}
        setCanShow={setCanShow}
        password={password}
        setPassword={setPassword}
        adImage={adImage}
        isNeedLogin={isNeedLogin}
        setIsNeedLogin={setIsNeedLogin}
      />
    </Box>
  );
}
