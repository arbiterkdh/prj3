import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { MovieHome } from "./page/moviehome/MovieHome.jsx";
import { Movie } from "./page/movie/Movie.jsx";
import { Book } from "./page/book/Book.jsx";
import { Theater } from "./page/theater/Theater.jsx";
import { Store } from "./page/store/Store.jsx";
import { Promo } from "./page/promotion/Promo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MovieHome /> },
      { path: "movie", element: <Movie /> },
      { path: "book", element: <Book /> },
      { path: "theater", element: <Theater /> },
      { path: "promotion", element: <Promo /> },
      { path: "store", element: <Store /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
