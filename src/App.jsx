import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import "./App.css";
import BooksData from "./Modules/Books/BooksData";
import BooksList from "./Modules/Books/BooksList";
import MasterLayout from "./Modules/Shared/MasterLayout/MasterLayout";
import NotFound from "./Modules/Shared/NotFound/NotFound";

function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <BooksList />,
        },
        {
          path: "books-data",
          element: <BooksData />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
