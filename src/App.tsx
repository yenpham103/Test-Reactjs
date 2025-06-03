import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { motion } from 'framer-motion';
import { store } from './redux/store';
import { loadTodos } from './redux/slice/todoSlice';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import type { Todo } from './types/todo';

const TodoApp: React.FC = () => {
  const dispatch = useDispatch();
  const [localTodos, setLocalTodos] = useLocalStorage<Todo[]>('todos', []);

  useEffect(() => {
    dispatch(loadTodos(localTodos));
  }, [dispatch, localTodos]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      setLocalTodos(state.todo.todos);
    });

    return unsubscribe;
  }, [setLocalTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            ✨ Todo List
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks with ease
          </p>
        </motion.div>

        <TodoInput />
        <TodoFilter />
        <TodoList />
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;