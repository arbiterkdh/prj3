import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { MovieHome } from "./page/moviehome/MovieHome.jsx";
import { Movie } from "./page/movie/Movie.jsx";
import { Book } from "./page/book/Book.jsx";
import { Theater } from "./page/theater/Theater.jsx";
import { Store } from "./page/store/Store.jsx";
import { Promo } from "./page/promotion/Promo.jsx";
import { StoreAdd } from "./page/store/StoreAdd.jsx";
import { StoreList } from "./page/store/StoreList.jsx";
import { MemberSignup } from "./member/MemberSignup.jsx";
import { MovieAdd } from "./page/movie/MovieAdd.jsx";
import { MovieList } from "./page/movie/MovieList.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MovieHome /> },
      { path: "signup", element: <MemberSignup /> },
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
        ],
      },
      { path: "book", element: <Book /> },
      { path: "theater", element: <Theater /> },
      { path: "promotion", element: <Promo /> },
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
