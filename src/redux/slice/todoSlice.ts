import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FilterType, Todo } from '../../types/todo';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  editingId: string | null;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  editingId: null,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.trim(),
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      state.todos.unshift(newTodo);
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = Date.now();
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text.trim();
        todo.updatedAt = Date.now();
      }
      state.editingId = null;
    },

    setEditingId: (state, action: PayloadAction<string | null>) => {
      state.editingId = action.payload;
    },

    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },

    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setEditingId,
  setFilter,
  loadTodos,
  clearCompleted,
} = todoSlice.actions;

// Selectors
export const selectTodos = (state: { todo: TodoState }) => state.todo.todos;
export const selectFilter = (state: { todo: TodoState }) => state.todo.filter;
export const selectEditingId = (state: { todo: TodoState }) => state.todo.editingId;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

export const selectTodoStats = createSelector([selectTodos], (todos) => ({
  total: todos.length,
  completed: todos.filter(todo => todo.completed).length,
  pending: todos.filter(todo => !todo.completed).length,
}));
