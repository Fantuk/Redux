import React, { useRef, useState } from "react";
import { TodoState } from "@/app/GlobalRedux/Features/todos/todosSlice";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  toggleTodo,
  updateTodo,
} from "@/app/GlobalRedux/Features/todos/todosSlice";

export const Todo = (todo: TodoState) => {
  const dispatch = useDispatch();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li
      className="flex items-center gap-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white hover:shadow-md transition-shadow"
      key={todo.id}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:ring-2"
      />

      {/* Title */}
      <div className="flex flex-col flex-1">
        <h2
          className={`text-lg font-semibold ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h2>
        <p className="text-sm text-gray-600">{todo.value}</p>
      </div>

      {isEditing && (
        <>
          {/* Title Input */}
          <input
            type="text"
            defaultValue={todo.title}
            placeholder="Update title"
            onChange={(e) =>
              dispatch(
                updateTodo({
                  id: todo.id,
                  title: e.target.value,
                })
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (titleInputRef.current) {
                  dispatch(
                    updateTodo({
                      id: todo.id,
                      title: titleInputRef.current.value,
                    })
                  );
                  titleInputRef.current.value = "";
                }
              }
            }}
            ref={titleInputRef}
            className="w-1/4 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />

          {/* Value Input */}
          <input
            type="text"
            defaultValue={todo.value}
            ref={valueInputRef}
            onChange={(e) =>
              dispatch(updateTodo({ id: todo.id, value: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (valueInputRef.current) {
                  dispatch(
                    updateTodo({
                      id: todo.id,
                      value: valueInputRef.current.value,
                    })
                  );
                  valueInputRef.current.value = "";
                }
              }
            }}
            placeholder="Update value"
            className="w-1/4 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />

          {/* Save Button */}
          <button
            type="button"
            onClick={() => {
              setIsEditing(!isEditing);
              if (titleInputRef.current && valueInputRef.current) {
                dispatch(
                  updateTodo({
                    id: todo.id,
                    title: titleInputRef.current.value,
                    value: valueInputRef.current.value,
                  })
                );
                titleInputRef.current.value = "";
                valueInputRef.current.value = "";
              }
            }}
            className="px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Save
          </button>
        </>
      )}

      {!isEditing && (
        <>
          {/* Edit Button */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            ✏️
          </button>
        </>
      )}
      {/* Delete Button */}
      <button
        type="button"
        onClick={() => dispatch(removeTodo(todo.id))}
        className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      >
        🗑️
      </button>
    </li>
  );
};
