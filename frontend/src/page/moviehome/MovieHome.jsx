import { Box, Center, Heading, Image, Stack } from "@chakra-ui/react";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import BookBox from "../../css/theme/component/box/BookBox.jsx";
import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function MovieHome() {
  const { dailyBoxOffice, KMDbKey, KOFICKey, today, year, month, day } =
    useOutletContext();
  const KMDbMovieInfoURL = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detais`;

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
        const posterUrl = res.map(
          (res) => res.data.Data[0].Result[0].posters.split("|")[0],
        );
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
        mt={"-33px"}
        w={"1920px"}
        h={"1280px"}
        position={"fixed"}
        src={
          "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/theater-8569119_1920.jpg"
        }
        zIndex={-2}
      />
      <Center bgColor="blackAlpha.800">
        <CenterBox m={10} bgColor="black" color={"white"}>
          <Heading>BOX OFFICE 순위</Heading>
          <Box>(오늘 {month + "월 " + day + "일 "}기준)</Box>
          <GapFlex>
            {PosterUrlList.map((url, index) => (
              <BookBox key={index} w={"300px"} h={"400px"}>
                <Stack align={"center"}>
                  <Image h={"350px"} src={url} />
                  <Box fontWeight={600}>
                    {index + 1}위. {dailyBoxOffice[index].movieNm}
                  </Box>
                </Stack>
              </BookBox>
            ))}
          </GapFlex>
        </CenterBox>
      </Center>
    </Box>
  );
}
