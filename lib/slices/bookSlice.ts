import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PROD_URL } from "../api";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async ({ token, page, title, genre }: any) => {
    const response = await fetch(
      `${PROD_URL}book/getAll?page=${page}&size=10${
        title ? "&title=" + title : ""
      }${genre ? "&genre=" + genre : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const getBookById = createAsyncThunk(
  "book/getBookById",
  async ({ token, bookId }: any) => {
    const response = await fetch(`${PROD_URL}book/getById?bookId=${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  }
);

export const getReviewsByBookId = createAsyncThunk(
  "book/getReviewsByBookId",
  async ({ token, bookId }: any) => {
    const response = await fetch(
      `${PROD_URL}review/getByBookId?bookId=${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const submitBookReview = createAsyncThunk(
  "book/review",
  async ({ token, bookId, email, review, rating }: any) => {
    const response = await fetch(`${PROD_URL}review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookId,
        review,
        rating,
        email,
      }),
    });
    return await response.json();
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: null,
    book: null,
    reviews: [],
    isReviewSubmitLoading: false,
    isGetBooksLoading: true,
    isGetBookByIdLoading: true,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isGetBooksLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isGetBooksLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isGetBooksLoading = false;
      })
      .addCase(getBookById.pending, (state) => {
        state.isGetBookByIdLoading = true;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.isGetBookByIdLoading = false;
        state.book = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.isGetBookByIdLoading = false;
      })
      .addCase(getReviewsByBookId.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(submitBookReview.pending, (state) => {
        state.isReviewSubmitLoading = true;
      })
      .addCase(submitBookReview.fulfilled, (state, action) => {
        state.isReviewSubmitLoading = false;
      })
      .addCase(submitBookReview.rejected, (state, action) => {
        state.isReviewSubmitLoading = false;
      });
  },
});

export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;
