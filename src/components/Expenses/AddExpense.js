import React from "react";
import "./AddExpense.css"

const AddExpense = () => {
  return (
    <div>
      <ul className="list">
        <li className="listNo">
          description <button className="btnE">Edit</button>{" "}
          <button className="btnD">Delete</button>{" "}
        </li>
        <li className="listNo">
          amount <button className="btnE">Edit</button>{" "}
          <button className="btnD">Delete</button>{" "}
        </li>
        <li className="listNo">
          Category <button className="btnE">Edit</button>{" "}
          <button className="btnD">Delete</button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default AddExpense;
