import { Outlet, useLocation, useParams } from "react-router-dom";
import { PromoNavbar } from "./PromoNavbar.jsx";
import { Box } from "@chakra-ui/react";

export function Promo() {
  const location = useLocation();
  const { id } = useParams();
  const { promoId } = useParams();

  const excludeNavbarPaths = [
    "/promotion/eventResult",
    "/promotion/eventResult/add",
    `/promotion/eventResult/modify/${id}`,
    `/promotion/view/${promoId}`,
    "/promotion/eventEnd",
    "/promotion/eventUpcoming",
  ];

  const shouldShowNavbar = !excludeNavbarPaths.includes(location.pathname);

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
