import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ListTodo, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { selectFilter, selectTodoStats, setFilter, clearCompleted } from '../redux/slice/todoSlice';
import type { FilterType } from '../types/todo';

const filterOptions: {
    key: FilterType;
    label: string;
    icon: React.ReactNode;
    activeColor: string;
    hoverColor: string;
}[] = [
        {
            key: 'all',
            label: 'Tất cả',
            icon: <ListTodo size={18} />,
            activeColor: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-400 hover:to-purple-500'
        },
        {
            key: 'pending',
            label: 'Đang chờ',
            icon: <Clock size={18} />,
            activeColor: 'from-orange-500 to-yellow-500',
            hoverColor: 'hover:from-orange-400 hover:to-yellow-400'
        },
        {
            key: 'completed',
            label: 'Hoàn thành',
            icon: <CheckCircle size={18} />,
            activeColor: 'from-green-500 to-emerald-500',
            hoverColor: 'hover:from-green-400 hover:to-emerald-400'
        },
    ];

export const TodoFilter: React.FC = () => {
    const currentFilter = useSelector(selectFilter);
    const stats = useSelector(selectTodoStats);
    const dispatch = useDispatch();

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {filterOptions.map((option, index) => (
                    <motion.button
                        key={option.key}
                        onClick={() => dispatch(setFilter(option.key))}
                        className={`
              relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg cursor-pointer
              ${currentFilter === option.key
                                ? `bg-gradient-to-r ${option.activeColor} text-white shadow-xl scale-105`
                                : `bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:shadow-xl hover:scale-105 ${option.hoverColor} hover:text-white`
                            }
            `}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <span className="drop-shadow-sm">{option.icon}</span>
                        <span>{option.label}</span>

                        {currentFilter === option.key && (
                            <motion.div
                                className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full shadow-md"
                                layoutId="activeIndicator"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{ x: '-50%' }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            <motion.div
                className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span className="text-orange-600 dark:text-orange-400 font-bold">{stats.pending}</span> đang chờ
                        </span>
                    </div>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span className="text-green-600 dark:text-green-400 font-bold">{stats.completed}</span> hoàn thành
                        </span>
                    </div>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Tổng: <span className="text-purple-600 dark:text-purple-400 font-bold">{stats.total}</span>
                    </div>
                </div>

                {stats.completed > 0 && (
                    <motion.button
                        onClick={() => dispatch(clearCompleted())}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <Trash2 size={16} />
                        <span>Delete Completed</span>
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    );
};
