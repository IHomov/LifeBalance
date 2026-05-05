import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find(item => item.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { setTasks, addItem, removeItem, toggleTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;