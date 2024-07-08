import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";

// get all books from server
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axios.get(`${baseUrl}/books`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// add new book
export const addBook = createAsyncThunk(
  "book/addBook",
  async (data, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    try {
      data.auth = getState().auth.name;
      data.creationDate = Date.now();
      data.modificationDate = Date.now();
      const response = await axios.post(`${baseUrl}/books`, data);
      toast.success("Add Book Successfully");
      dispatch(getBooks());
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error(error.message));
    }
  }
);

// update book
export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (data, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    try {
      data.book.auth = getState().auth.name;
      data.book.modificationDate = Date.now();
      const response = await axios.put(
        `${baseUrl}/books/${data.id}`,
        data.book
      );
      toast.success("Update Book Successfully");
      dispatch(getBooks());
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error(error.message));
    }
  }
);

// delete book
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const response = await axios.delete(`${baseUrl}/books/${id}`);
      toast.success("Delete Book Successfully");
      dispatch(getBooks());
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error(error.message));
    }
  }
);

// book slice
const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get books
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // add books
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // delete books
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // update books
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
