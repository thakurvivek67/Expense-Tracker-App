import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk action using createAsyncThunk
export const createUser = createAsyncThunk(
  'userDetail/createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("https://expense-4ca11-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice using createSlice
const userdetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    // You can define additional synchronous actions here if needed
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload); // Assuming payload is the new user object returned from the API
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload; // action.payload will contain the error message from rejectWithValue
    },
  },
});

// Export the reducer and actions
// userDetailSlice.js
export default userdetailSlice.reducer;

export const { searchUser } = userdetailSlice.actions; // Corrected from userDetail.actions to userDetailSlice.actions
