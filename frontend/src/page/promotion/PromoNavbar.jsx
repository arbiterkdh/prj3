import {
  Box,
  Button,
  Center,
  Heading,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";

export function PromoNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabIndex =
    {
      "/promotion/all": 0,
      "/promotion/movie": 1,
      "/promotion/theater": 2,
      "/promotion/membership": 3,
      "/promotion/discount": 4,
    }[location.pathname.split("?")[0]] || 0;

  const handleTabClick = (path) => {
    if (location.pathname !== path) {
      navigate(path); // 기본 경로로 이동
    } else {
      navigate(path, { replace: true }); // 강제로 기본 경로로 이동
    }
  };

  return (
    <Center>
      <CenterBox>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Heading
            onClick={() => navigate("/promotion/all")}
            style={{ cursor: "pointer" }}
          >
            진행중인 이벤트
          </Heading>
          <Box display="flex" gap={2}>
            <Button
              bg={"green"}
              color={"white"}
              _hover={{ bg: "darkred" }}
              onClick={() => navigate("/promotion/add")}
              size="sm"
            >
              새글작성
            </Button>
          </Box>
        </Box>
        <Tabs
          isFitted
          variant="enclosed"
          width="100%"
          index={tabIndex}
          onChange={(index) => {
            const paths = [
              "/promotion/all",
              "/promotion/movie",
              "/promotion/theater",
              "/promotion/membership",
              "/promotion/discount",
            ];
            handleTabClick(paths[index]);
          }}
        >
          <TabList mb="2em">
            <Tab>전체</Tab>
            <Tab>영화</Tab>
            <Tab>극장</Tab>
            <Tab>멤버십</Tab>
            <Tab>제휴/할인</Tab>
          </TabList>
        </Tabs>
        <Outlet />
      </CenterBox>
    </Center>
  );
}
