import {
    createAsyncThunk,
    createSlice,
    createSelector,
  } from '@reduxjs/toolkit';
  
  export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
      todoList: [],
    },
  
    reducers: {
      todoAdd: (state, action) => {
        state.todoList.push(action.payload);
      },
  
      removeTodo: (state, action) => {
        state.todoList = state.todoList.filter(
          (todo) => todo.id !== action.payload
        );
      },
      completedTodo: (state, action) => {
        //state
        //id
        const { status, id } = action.payload;
        state.todoList = state.todoList.map((todo) => {
          if (todo.id === id) {
            todo.completed = status;
          }
          return todo;
        });
      },
    },
  
    //extraReducers sử dụng khi call api
    extraReducers: (builder) => {
      //pending
      builder.addCase(getTodos.pending, (state) => {
        state.status = 'pending';
      });
  
      //fulfilled
      builder.addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todoList = action.payload;
      });
  
      //rejected
      builder.addCase(getTodos.rejected, (state) => {
        state.status = 'rejected';
      });
    },
  });
  
  export const { todoAdd, removeTodo, completedTodo, loadTodos } =
    todoSlice.actions;
  
  //Redux Thunk
  // export const getTodos = () => {
  //   return async (dispatch) => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  //     const data = await response.json();
  //     dispatch(loadTodos(data));
  //   };
  // };
  
  export const getTodos = createAsyncThunk(
    'todo/getTodos',
    async (_, { rejectWithValue }) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        return rejectWithValue('error');
      }
      const data = await response.json();
      return data;
    }
  );
  
  //rejectWithValue là tham số thứ 2 nên bắt buộc phải khai báo đúng thư tự dùng để bắt lỗi khi call api
  
  //selector
  // https://redux-toolkit.js.org/api/createSelector
  export const selectorTodoList = (state) => state.todo.todoList;
  export const selectorStatus = (state) => state.todo.status;
  
  //memoize javascript
  export const selectorTodoListCompleted = createSelector(
    [selectorTodoList],
    (todoList) => todoList.filter((todo) => todo.completed)
  );