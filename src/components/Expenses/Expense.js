import React, { useState } from "react";
import HomePage from "../Home/HomePage";
import AddExpense from "./AddExpense";
import "./Expense.css";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from "../../store/UserdetailSlice"; 

const Expense = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food" // Default category
  });

  const { loading, error } = useSelector(state => state.userDetail);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract data from form
    const { description, amount, category } = formData;
    const newUser = { description, amount, category };

    // Dispatch async action to create user
    dispatch(createUser(newUser));

    // Reset form after submission (if needed)
    setFormData({
      description: "",
      amount: "",
      category: "Food" // Reset to default category
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div>
      <HomePage />
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Rent">Rent</option>
          <option value="Gym">Gym</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <AddExpense />
    </div>
  );
};

export default Expense;

