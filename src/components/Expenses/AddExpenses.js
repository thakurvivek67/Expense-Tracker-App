import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../../store/ExpenseSlice';
import './AddExpenses.css';

const AddExpenses = () => {
    const dispatch = useDispatch();

    const [money, setMoney] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Food');
    const [expensesList, setExpensesList] = useState([]);
    const [showActivatePremium, setShowActivatePremium] = useState(false);
    const [editingExpenseId, setEditingExpenseId] = useState(null); // Track the expense being edited

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(
                'https://expense-4ca11-default-rtdb.firebaseio.com/expenses.json'
            );
            if (res.status === 200) {
                const data = res.data;

                const loadedExpenses = [];
                for (const key in data) {
                    const parsedData = JSON.parse(data[key].body);
                    loadedExpenses.unshift({
                        id: key,
                        money: parsedData.money,
                        description: parsedData.description,
                        category: parsedData.category,
                    });
                }
                dispatch(expenseActions.addExpense(loadedExpenses));
                setExpensesList(loadedExpenses);
            } else {
                alert('Something went wrong, please refresh the page.');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (money && description && category) {
            const expenses = {
                money: money,
                description: description,
                category: category,
            };
            try {
                if (editingExpenseId) {
                    // Update existing expense
                    await axios.put(
                        `https://expense-4ca11-default-rtdb.firebaseio.com/expenses/${editingExpenseId}.json`,
                        {
                            body: JSON.stringify(expenses),
                            headers: {
                                'content-type': 'application/json',
                            },
                        }
                    );

                    // Update expensesList state after edit
                    setExpensesList(prevExpenses =>
                        prevExpenses.map(expense =>
                            expense.id === editingExpenseId
                                ? { ...expense, money, description, category }
                                : expense
                        )
                    );

                    setEditingExpenseId(null); // Clear editing state
                } else {
                    // Add new expense
                    const resp = await axios.post(
                        'https://expense-4ca11-default-rtdb.firebaseio.com/expenses.json',
                        {
                            body: JSON.stringify(expenses),
                            headers: {
                                'content-type': 'application/json',
                            },
                        }
                    );

                    if (resp.status === 200) {
                        setExpensesList(prevExpenses => [
                            {
                                id: resp.data.name,
                                money: expenses.money,
                                description: expenses.description,
                                category: expenses.category,
                            },
                            ...prevExpenses,
                        ]);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
            setCategory('Food');
            setDescription('');
            setMoney('');
        } else {
            alert('Please enter all details.');
        }
    };

    const handleEditClick = (id) => {
        const expenseToEdit = expensesList.find(expense => expense.id === id);
        if (expenseToEdit) {
            setMoney(expenseToEdit.money);
            setDescription(expenseToEdit.description);
            setCategory(expenseToEdit.category);
            setEditingExpenseId(id);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(
                `https://expense-4ca11-default-rtdb.firebaseio.com/expenses/${id}.json`
            );
            setExpensesList(prevExpenses =>
                prevExpenses.filter(expense => expense.id !== id)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h2>Add Expense</h2>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="amount" className="label">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={money}
                        onChange={(e) => setMoney(e.target.value)}
                        className="input"
                        placeholder="Enter the amount"
                        required
                    />

                    <label htmlFor="description" className="label">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input"
                        placeholder="Enter the description"
                        required
                    />

                    <label htmlFor="category" className="label">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select"
                        required
                    >
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </select>

                    <button
                        type="submit"
                        className="btn-add"
                    >
                        {editingExpenseId ? 'Update Expense' : 'Add Expense'}
                    </button>

                    {showActivatePremium && (
                        <button
                            className="btn1"
                            onClick={() => {
                                alert('Premium Activated');
                            }}
                        >
                            Activate Gold
                        </button>
                    )}
                </form>
            </div>
            <div className="list-container">
                <h3>Expense List</h3>
                <ul>
                    {expensesList.map((expense) => (
                        <li key={expense.id} className="list">
                            <div>
                                <p className="value">{`Amount: ${expense.money}`}</p>
                                <p className="value">{`Description: ${expense.description}`}</p>
                                <p className="value">{`Category: ${expense.category}`}</p>
                            </div>
                            <div>
                                <button
                                    className="edit"
                                    onClick={() => handleEditClick(expense.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => handleDeleteClick(expense.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddExpenses;
