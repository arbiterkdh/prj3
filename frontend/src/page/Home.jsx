import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import { Navbar } from "../component/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon as emptyMoon,
  faSun as emptySun,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMoon as fullMoon,
  faSun as fullSun,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const { toggleColorMode, colorMode } = useColorMode();
  const [mode, setMode] = useState(false);
  const KMDbKey = import.meta.env.VITE_KMDb_APP_KEY;
  const KOFICKey = import.meta.env.VITE_KOFIC_APP_KEY;

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const yesterday = ("0" + (today.getDate() - 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + month + yesterday;

  const [dailyBoxOffice, setDailyBoxOffice] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?targetDt=${dateString}&key=${KOFICKey}`,
      )
      .then((res) => {
        setDailyBoxOffice(res.data.boxOfficeResult.dailyBoxOfficeList);
      })
      .catch()
      .finally();
  }, []);

  return (
    <Box
      w={{
        base: "1000px",
        lg: "100%",
      }}
    >
      <Navbar />
      <Box mt={"110px"}>
        <Outlet
          context={{
            dailyBoxOffice,
            KMDbKey,
            KOFICKey,
            today,
            dateString,
            year,
            month,
            day,
          }}
        />
      </Box>
      <IconButton
        aria-label={"toggle theme"}
        rounded={"full"}
        size={"md"}
        position={"fixed"}
        zIndex={100}
        bottom={2}
        right={2}
        onClick={toggleColorMode}
        onMouseEnter={() => setMode(true)}
        onMouseLeave={() => setMode(false)}
        icon={
          colorMode === "dark" ? (
            <Box>
              {mode && <FontAwesomeIcon icon={emptyMoon} />}
              {mode || <FontAwesomeIcon icon={fullMoon} />}
            </Box>
          ) : (
            <Box>
              {mode && <FontAwesomeIcon icon={fullSun} />}
              {mode || <FontAwesomeIcon icon={emptySun} />}
            </Box>
          )
        }
      />
    </Box>
  );
}
