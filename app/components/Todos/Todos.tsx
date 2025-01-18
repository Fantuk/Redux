"use client";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TodoState } from "@/app/GlobalRedux/Features/todos/todosSlice";
import { addTodo } from "@/app/GlobalRedux/Features/todos/todosSlice";
import { Todo } from "./Todo";

export const Todos = () => {
  const todos = useSelector((state: { todos: TodoState[] }) => state.todos);
  const dispatch = useDispatch();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Заголовок */}
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Todos</h1>

      {/* Форма добавления */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Todo title"
          ref={titleInputRef}
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Todo value"
          ref={valueInputRef}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={() => {
            if (titleInputRef.current && valueInputRef.current) {
              dispatch(addTodo({
                title: titleInputRef.current.value,
                value: valueInputRef.current.value
              }));
              titleInputRef.current.value = "";
              valueInputRef.current.value = "";
            }
          }}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Todo
        </button>
      </div>

      {/* Список задач */}
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <Todo key={index} {...todo} />
        ))}
      </ul>
    </div>
  );
};
