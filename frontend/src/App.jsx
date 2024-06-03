import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./page/Home.jsx";
import {MovieHome} from "./page/moviehome/MovieHome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MovieHome />}
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
      </>
  )
}

export default App
