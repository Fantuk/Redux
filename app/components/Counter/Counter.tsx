"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from "@/app/GlobalRedux/Features/counter/counterSlice";

export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1 className="text-3xl">{count}</h1>
      <div className="flex flex-col items-start gap-2">
        <button
          className="mr-2 border p-2"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="mr-2 border p-2"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="mr-2 border p-2"
          onClick={() => dispatch(incrementByAmount(3))}
        >
          Increment By 3
        </button>
        <button
          className="mr-2 border p-2"
          onClick={() => dispatch(decrementByAmount(3))}
        >
          Decrement By 3
        </button>
      </div>
    </div>
  );
};
