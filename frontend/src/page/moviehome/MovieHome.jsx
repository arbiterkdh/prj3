import { Box, Center, Heading, Image, Spinner, Stack } from "@chakra-ui/react";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import BookBox from "../../css/theme/component/box/BookBox.jsx";
import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function MovieHome() {
  const { dailyBoxOffice, KMDbKey, KOFICKey, today, year, month, day } =
    useOutletContext();
  const KMDbMovieInfoURL = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y`;

  const [PosterUrlList, setPosterUrlList] = useState([]);

  useEffect(() => {
    const fetchMoviePosters = async () => {
      const requests = dailyBoxOffice
        .slice(0, 4)
        .map((movie) =>
          axios.get(
            `${KMDbMovieInfoURL}&title=${movie.movieNm}&ServiceKey=${KMDbKey}`,
          ),
        );

      try {
        const res = await Promise.all(requests);
        const posterUrl = res.map((res) => {
          let postersLength =
            res.data.Data[0].Result[0].posters.split("|").length;
          return res.data.Data[0].Result[0].posters.split("|")[
            Math.floor(Math.random() * postersLength)
          ];
        });
        setPosterUrlList(posterUrl);
      } catch (err) {
        console.error(err);
      }
    };

    if (dailyBoxOffice.length > 0) {
      fetchMoviePosters();
    }
  }, [dailyBoxOffice]);

  return (
    <Box align={"center"} overflow={"hidden"}>
      <Image
        minWidth={"100%"}
        minHeight={"86%"}
        position={"fixed"}
        src={
          "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/ccvtheaterbg.jpg"
        }
        _dark={{
          opacity: "0.7",
        }}
        zIndex={-1}
      />
      <Center
        mt={12}
        bgColor={"blackAlpha.700"}
        _dark={{ bgColor: "blackAlpha.600" }}
      >
        <CenterBox
          border={"none"}
          bgColor={""}
          color={"whiteAlpha.900"}
          _dark={{ color: "whiteAlpha.800" }}
        >
          <Heading mt={-6} fontSize={"2rem"}>
            BOX OFFICE 순위
          </Heading>
          <Box>(오늘 {month + "월 " + day + "일 "}기준)</Box>
          {dailyBoxOffice.length > 0 ? (
            <GapFlex>
              {PosterUrlList.map((url, index) => (
                <BookBox key={index} w={"300px"} h={"400px"} border={"0px"}>
                  <Stack align={"center"}>
                    <Image h={"350px"} src={url} _dark={{ opacity: "0.8" }} />
                    <Box fontWeight={600} fontSize={"1.05rem"}>
                      {index + 1}위. {dailyBoxOffice[index].movieNm}
                    </Box>
                  </Stack>
                </BookBox>
              ))}
            </GapFlex>
          ) : (
            <Box h={"400px"} alignContent={"center"}>
              <Spinner />
              <Box>이미지를 불러오는 중입니다...</Box>
            </Box>
          )}
        </CenterBox>
      </Center>
    </Box>
  );
}
