import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit3, Trash2, X, Save } from 'lucide-react';
import { toggleTodo, deleteTodo, editTodo, setEditingId, selectEditingId } from '../redux/slice/todoSlice';
import type { Todo } from '../types/todo';

interface TodoItemProps {
    todo: Todo;
    index: number;
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: "blur(4px)"
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.4,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
            filter: { duration: 0.3 }
        }
    }),
    exit: {
        opacity: 0,
        x: -100,
        scale: 0.9,
        filter: "blur(4px)",
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

const checkVariants = {
    unchecked: {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgb(209, 213, 219)"
    },
    checked: {
        scale: [1, 1.2, 1],
        backgroundColor: "rgb(34, 197, 94)",
        borderColor: "rgb(34, 197, 94)",
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
    const [editText, setEditText] = useState(todo.text);
    const editInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const editingId = useSelector(selectEditingId);
    const isEditing = editingId === todo.id;

    useEffect(() => {
        if (isEditing && editInputRef.current) {
            editInputRef.current.focus();
            editInputRef.current.select();
        }
    }, [isEditing]);

    const handleEdit = () => {
        if (editText.trim() && editText !== todo.text) {
            dispatch(editTodo({ id: todo.id, text: editText }));
        } else {
            dispatch(setEditingId(null));
            setEditText(todo.text);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            dispatch(setEditingId(null));
            setEditText(todo.text);
        }
    };

    return (
        <motion.div
            layout
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 transition-all duration-300 ${todo.completed
                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md'
                }`}
            whileHover={{
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
        >
            <div className="flex items-center gap-3">
                <motion.button
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
                        }`}
                    variants={checkVariants}
                    animate={todo.completed ? "checked" : "unchecked"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {todo.completed && (
                            <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{
                                    duration: 0.2,
                                    ease: "backOut"
                                }}
                            >
                                <Check size={14} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                <AnimatePresence mode="wait">
                    {isEditing ? (
                        <motion.div
                            key="editing"
                            className="flex-1 flex items-center gap-2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <input
                                ref={editInputRef}
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                            />
                            <div className="flex gap-1">
                                <motion.button
                                    onClick={handleEdit}
                                    className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Save size={16} />
                                </motion.button>
                                <motion.button
                                    onClick={() => {
                                        dispatch(setEditingId(null));
                                        setEditText(todo.text);
                                    }}
                                    className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X size={16} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="viewing"
                            className="flex-1 flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex-1">
                                <motion.p
                                    className={`text-lg transition-all duration-300 ${todo.completed
                                        ? 'line-through text-gray-500 dark:text-gray-400'
                                        : 'text-gray-800 dark:text-gray-200'
                                        }`}
                                    animate={{
                                        scale: todo.completed ? 0.98 : 1,
                                        opacity: todo.completed ? 0.7 : 1
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {todo.text}
                                </motion.p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {new Date(todo.createdAt).toLocaleDateString('vi-VN')}
                                </p>
                            </div>

                            <motion.div
                                className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                initial={{ x: 10 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.button
                                    onClick={() => {
                                        dispatch(setEditingId(todo.id));
                                        setEditText(todo.text);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Edit3 size={16} />
                                </motion.button>
                                <motion.button
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                    whileHover={{ scale: 1.05, rotate: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Trash2 size={16} />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
