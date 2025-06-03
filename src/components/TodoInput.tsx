import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { addTodo } from '../redux/slice/todoSlice';

export const TodoInput: React.FC = () => {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && !isSubmitting) {
            setIsSubmitting(true);

            await new Promise(resolve => setTimeout(resolve, 200));

            dispatch(addTodo(text));
            setText('');
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="relative mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            <div className="relative">
                <motion.input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Thêm công việc mới..."
                    className="w-full pl-6 pr-16 py-4 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                    whileFocus={{
                        scale: 1.02,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                />

                <motion.button
                    type="submit"
                    disabled={!text.trim() || isSubmitting}
                    className={`cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 p-3 rounded-lg shadow-md transition-all duration-300 ${text.trim() && !isSubmitting
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                    whileHover={text.trim() && !isSubmitting ? {
                        scale: 1.05,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                    } : {}}
                    whileTap={text.trim() && !isSubmitting ? { scale: 0.95 } : {}}
                    animate={isSubmitting ? {
                        rotate: 360,
                        transition: { duration: 0.5, ease: "linear" }
                    } : {}}
                >
                    {isSubmitting ? (
                        <Sparkles size={20} />
                    ) : (
                        <Plus size={20} />
                    )}
                </motion.button>
            </div>
        </motion.form>
    );
};
