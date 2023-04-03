import { createSlice } from "@reduxjs/toolkit";
import data from "../../../public/data/data.json";

import { v4 as uuidv4 } from "uuid";

const bookSlice = createSlice({
  name: "books",
  initialState: data.books,

  reducers: {
    addBook: (state, action) => {
      const addedBook = {
        id: uuidv4(),
        ...action.payload,
      };
      return [...state, addedBook];
    },

    updateBook: (state, action) => {
      const updatedBook = action.payload;
      return [updatedBook, ...state.filter((b) => b.id !== updatedBook.id)];
    },

    deleteBook: (state, action) => {
      const deletedBookId = action.payload;
      return [...state.filter((book) => book.id !== deletedBookId)];
    },
  },
});

export const { addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
