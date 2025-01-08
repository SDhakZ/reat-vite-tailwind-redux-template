import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./features/counterSlice";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = (amount) => {
    dispatch(incrementByAmount(amount));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Redux Toolkit Counter Example</h1>
      <p>Count: {count}</p>

      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
      <button onClick={() => handleIncrementByAmount(5)}>+5</button>
    </div>
  );
}

export default App;
