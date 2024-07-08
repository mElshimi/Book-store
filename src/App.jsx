import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./Modules/Shared/MasterLayout/MasterLayout";
import BooksList from "./Modules/Books/BooksList";
import BooksData from "./Modules/Books/BooksData";
import "./App.css";
import NotFound from "./Modules/Shared/NotFound/NotFound";

function App() {
  const routes = createBrowserRouter([
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
