import { Outlet, useLocation } from "react-router-dom";
import { PromoNavbar } from "./PromoNavbar.jsx";
import { Box } from "@chakra-ui/react";

export function Promo() {
  const location = useLocation();
  const excludeNavbarPaths = [
    "/promotion/eventResult",
    "/promotion/eventEnd",
    "/promotion/eventUpcoming",
  ];

  const shouldShowNavbar = !excludeNavbarPaths.some((path) =>
    location.pathname.includes(path),
  );

  return (
    <Box>
      {shouldShowNavbar ? (
        <PromoNavbar>
          <Outlet />
        </PromoNavbar>
      ) : (
        <Outlet />
      )}
    </Box>
  );
}
