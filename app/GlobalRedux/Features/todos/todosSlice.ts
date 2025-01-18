"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface TodoState {
  id: number;
  value: string;
  completed: boolean;
  title: string;
}

const initialState: TodoState[] = [];

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
        const { title, value } = action.payload;
      state.push({
        id: Date.now(),
        value,
        completed: false,
        title,
      });
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.value = action.payload.value;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
