import React from "react";
import HomePage from "../Home/HomePage";
import AddExpense from "./AddExpense";

const Expense = () => {
  return (
    <div>
      <HomePage />
      <form>
        <label htmlFor="description">Description</label>
        <input type="text" id="desription"></input>

        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount"></input>

        <label htmlFor="category">Category</label>
        <select id="category">
          <option>Food</option>
          <option>Petrol</option>
          <option>Rent</option>
          <option>Gym</option>
        </select>
        <button>Submit</button>
      </form>
      <AddExpense />
    </div>
  );
};

export default Expense;
