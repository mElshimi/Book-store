import { configureStore } from "@reduxjs/toolkit";
import books from "./bookSlice";
import auth from "./auth";

export default configureStore({
  reducer: {
    books,
    auth,
  },
});
