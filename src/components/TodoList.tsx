import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { selectFilteredTodos } from '../redux/slice/todoSlice';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
    const todos = useSelector(selectFilteredTodos);

    if (todos.length === 0) {
        return (
            <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                <motion.div
                    className="text-6xl mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                    }}
                >
                    📝
                </motion.div>
                <motion.p
                    className="text-xl text-gray-500 dark:text-gray-400 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                >
                    Chưa có công việc nào
                </motion.p>
                <motion.p
                    className="text-gray-400 dark:text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                >
                    Thêm công việc đầu tiên của bạn ở trên!
                </motion.p>
            </motion.div>
        );
    }

    return (
        <LayoutGroup>
            <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <AnimatePresence mode="wait">
                    {todos.map((todo, index) => (
                        <TodoItem key={todo.id} todo={todo} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </LayoutGroup>
    );
};