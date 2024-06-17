import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { MovieHome } from "./page/moviehome/MovieHome.jsx";
import { Movie } from "./page/movie/Movie.jsx";
import { Book } from "./page/book/Book.jsx";
import { Theater } from "./page/theater/Theater.jsx";
import { Store } from "./page/store/Store.jsx";
import { Promo } from "./page/promotion/Promo.jsx";
import { StoreAdd } from "./page/store/storeList/add/StoreAdd.jsx";
import { StoreList } from "./page/store/storeList/StoreList.jsx";
import { MovieAdd } from "./page/movie/add/MovieAdd.jsx";
import { MovieList } from "./page/movie/list/MovieList.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";
import { PromoAdd } from "./page/promotion/add/PromoAdd.jsx";
import { PromoList } from "./page/promotion/list/PromoList.jsx";
import { MovieView } from "./page/movie/list/view/MovieView.jsx";
import { TheaterLocation } from "./page/theater/list/location/TheaterLocation.jsx";
import { StoreCart } from "./page/store/cart/StoreCart.jsx";
import { StoreProductView } from "./page/store/view/storeProduct/StoreProductView.jsx";
import { MailVerify } from "./member/mail/MailVerify.jsx";
import { MovieModify } from "./page/movie/modify/MovieModify.jsx";
import { MemberSignup } from "./member/MemberSignup.jsx";
import { Oauth } from "./page/oauth/Oauth.jsx";
import { KakaoRedirect } from "./page/oauth/callback/KakaoRedirect.jsx";
import axios from "axios";
import { PromoResult } from "./page/promotion/view/PromoResult.jsx";
import { PromoEnd } from "./page/promotion/view/PromoEnd.jsx";
import { PromoUpcoming } from "./page/promotion/view/PromoUpcoming.jsx";
import { PromoModify } from "./page/promotion/modify/PromoModify.jsx";
import { PromoView } from "./page/promotion/view/PromoView.jsx"; // axios interceptor 설정
import { TheaterSeatList } from "./page/book/theater/TheaterSeatList.jsx";
import { BookHome } from "./page/book/BookHome.jsx";
import PaymentSuccess from "./page/store/payment/PaymentSuccess.jsx";

// axios interceptor 설정
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MovieHome /> },
      { path: "verify", element: <MailVerify /> },
      { path: "signup", element: <MemberSignup /> },
      {
        path: "oauth",
        element: <Oauth />,
        children: [{ path: "kakao/callback", element: <KakaoRedirect /> }],
      },
      {
        path: "movie",
        element: <Movie />,
        children: [
          {
            index: true,
            element: <MovieList />,
          },
          {
            path: "add",
            element: <MovieAdd />,
          },
          {
            path: "view/:id",
            element: <MovieView />,
          },
          {
            path: "modify/:id",
            element: <MovieModify />,
          },
        ],
      },
      {
        path: "book",
        element: <BookHome />,
        children: [
          { index: true, element: <Book /> },
          { path: "theaterseat", element: <TheaterSeatList /> },
        ],
      },

      {
        path: "theater",
        element: <Theater />,
      },
      { path: "theater/:number", element: <TheaterLocation /> },
      {
        path: "promotion",
        element: <Promo />,
        children: [
          { index: true, element: <PromoList /> },
          {
            path: "add",
            element: <PromoAdd />,
          },
          {
            path: "view",
            children: [
              {
                path: ":promoId",
                element: <PromoView />,
                children: [
                  {
                    path: "upcoming",
                    element: <PromoEnd />,
                  },
                  {
                    path: "end",
                    element: <PromoEnd />,
                  },
                  {
                    path: "eventResult",
                    element: <PromoResult />,
                  },
                ],
              },
            ],
          },
          {
            path: "modify/:promoId",
            element: <PromoModify />,
          },
        ],
      },
      {
        path: "promotion/eventUpcoming",
        element: <PromoUpcoming />,
      },
      {
        path: "promotion/eventEnd",
        element: <PromoEnd />,
      },
      {
        path: "promotion/eventResult",
        element: <PromoResult />,
      },
      {
        path: "store",
        element: <Store />,
        children: [
          {
            index: true,
            element: <StoreList />,
          },
          {
            path: "add",
            element: <StoreAdd />,
          },
          {
            path: "cart",
            element: <StoreCart />,
          },
          {
            path: "productView/:productId",
            element: <StoreProductView />,
          },
          {
            path: "/store/payment/payment-success",
            element: <PaymentSuccess />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </>
  );
}

export default App;
