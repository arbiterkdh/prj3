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
    }[location.pathname] || 0;

  return (
    <Center>
      <CenterBox>
        <Heading
          onClick={() => navigate("/promotion/all")}
          style={{ cursor: "pointer" }}
        >
          진행중인 이벤트
        </Heading>
        <Box borderBottom={"2px solid black"} />
        <Box display="flex" justifyContent="space-between" width="100%" mb={4}>
          <Tabs
            variant="unstyled"
            display="flex"
            alignItems="center"
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
              navigate(paths[index]);
            }}
          >
            <TabList display="flex" alignItems="center">
              <Tab _selected={{ color: "white", bg: "blue.500" }}>전체</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>영화</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>극장</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>멤버십</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>
                제휴/할인
              </Tab>
            </TabList>
            <Box ml="auto" display="flex" gap={2}>
              <Button
                bg={"green"}
                color={"white"}
                _hover={{ bg: "darkred" }}
                onClick={() => navigate("/promotion/add")}
                size="sm"
              >
                새글작성
              </Button>
              <Button
                bg={"red"}
                color={"white"}
                _hover={{ bg: "darkred" }}
                onClick={() => navigate("/promotion/eventResult")}
                size="sm"
              >
                당첨자 발표
              </Button>
              <Button
                bg={"red"}
                color={"white"}
                _hover={{ bg: "darkred" }}
                onClick={() => navigate("/promotion/eventEnd")}
                size="sm"
              >
                종료 이벤트
              </Button>
            </Box>
          </Tabs>
        </Box>
        <Box borderBottom={"1px solid lightgray"} marginBottom={5} />
        <Outlet />
      </CenterBox>
    </Center>
  );
}
