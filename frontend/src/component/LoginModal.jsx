import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MarginBox from "../css/theme/component/box/MarginBox.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye as emptyEye,
  faEyeSlash as emptyEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEye as fullEye,
  faEyeSlash as fullEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import CursorBox from "../css/theme/component/box/CursorBox.jsx";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import ColorButton from "../css/theme/component/button/ColorButton.jsx";

export function LoginModal({ isNeedLogin, setIsNeedLogin, isBookComponent }) {
  const account = useContext(LoginContext);
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [canShow, setCanShow] = useState(false);
  const [password, setPassword] = useState("");

  const [movieImages, setMovieImages] = useState([]);
  const [adImage, setAdImage] = useState("");

  const [email, setEmail] = useState("");
  const [eye, setEye] = useState(false);

  const [timer, setTimer] = useState(0);

  const timerRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

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
    if (isNeedLogin) {
      onOpen();
    }
    if (movieImages.length > 0) {
      const randomImage =
        movieImages[Math.floor(Math.random() * movieImages.length)];
      setAdImage(
        randomImage.slice(-4) !== "null"
          ? randomImage
          : "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/default-ad-image.jpg",
      );
    }
  }, [isNeedLogin, movieImages]);

  useEffect(() => {
    if (timer % 5 === 4) {
      setTimer(0);
      if (movieImages.length > 0) {
        const randomImage =
          movieImages[Math.floor(Math.random() * movieImages.length)];
        setAdImage(
          randomImage.slice(-4) !== "null"
            ? randomImage
            : "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/default-ad-image.jpg",
        );
      }
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);
        toast({
          status: "success",
          description: "로그인되었습니다.",
          position: "bottom-right",
        });
        onClose();
        if (!isBookComponent) {
          navigate("/");
        }
        setEmail("");
      })
      .catch(() => {
        account.logout();
        toast({
          status: "warning",
          description: "이메일 혹은 비밀번호를 확인해주세요.",
          position: "bottom-right",
        });
      })
      .finally(() => {
        setPassword("");
      });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setCanShow(false);
        setIsNeedLogin(false);
      }}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent minW={"760px"} h={"500px"} _dark={{ bgColor: "#04363A" }}>
        <ModalHeader
          bgColor={"red.600"}
          color={"whiteAlpha.900"}
          _dark={{
            bgColor: "red.700",
          }}
          h={10}
          alignContent={"center"}
        >
          로그인
        </ModalHeader>
        <ModalCloseButton color={"whiteAlpha.900"} />
        <Flex justifyContent={"space-between"} h={"100%"}>
          <MarginBox w={"50%"}>
            <ModalBody>
              <Box>
                <Input
                  placeholder={"이메일"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <InputGroup display={"inherit"}>
                  <Input
                    type={canShow ? "text" : "password"}
                    value={password}
                    placeholder={"비밀번호"}
                    onChange={(e) => {
                      setPassword(e.target.value.trim());
                    }}
                  />
                  <InputRightElement
                    onMouseEnter={() => setEye(true)}
                    onMouseLeave={() => setEye(false)}
                    onClick={() => {
                      setCanShow(!canShow);
                    }}
                  >
                    {canShow && (
                      <Box>
                        {eye || <FontAwesomeIcon icon={emptyEye} />}
                        {eye && <FontAwesomeIcon icon={fullEye} />}
                      </Box>
                    )}
                    {canShow || (
                      <Box>
                        {eye || <FontAwesomeIcon icon={emptyEyeSlash} />}
                        {eye && <FontAwesomeIcon icon={fullEyeSlash} />}
                      </Box>
                    )}
                  </InputRightElement>
                </InputGroup>
              </Box>
            </ModalBody>
            <ModalFooter ml={2}>
              <ColorButton w={"100%"} onClick={handleLogin}>
                로그인
              </ColorButton>
            </ModalFooter>
            <ModalFooter ml={2} display="flex" justifyContent="space-evenly">
              <CursorBox>ID/PW 찾기</CursorBox>
              <Divider orientation={"vertical"} />
              <CursorBox
                onClick={() => {
                  navigate("/signup");
                  onClose();
                }}
              >
                회원가입
              </CursorBox>
              <Divider orientation={"vertical"} />
              <CursorBox>비회원 예매확인</CursorBox>
            </ModalFooter>
            <ModalFooter ml={2} display="flex" justifyContent="space-evenly">
              <a href={""}>
                <Image
                  src={
                    "https://megabox.co.kr/static/pc/images/member/ico-naver.png"
                  }
                />
              </a>
              <a
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${account.kakaoKey}&redirect_uri=${account.kakaoUri}&response_type=code`}
              >
                <Image
                  src={
                    "https://megabox.co.kr/static/pc/images/member/ico-kakao.png"
                  }
                />
              </a>
              <a href={""}>
                <Image
                  src={
                    "https://megabox.co.kr/static/pc/images/member/ico-payco.png"
                  }
                />
              </a>
            </ModalFooter>
          </MarginBox>
          <MarginBox
            border={"1px solid"}
            w={"50%"}
            h={"444px"}
            align={"center"}
            bgColor={"blackAlpha.900"}
          >
            <Image
              src={adImage}
              maxW={"372px"}
              maxH={"444px"}
              objectFit={"cover"}
            />
          </MarginBox>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
