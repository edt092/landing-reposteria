'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md overflow-hidden mb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 md:px-6 lg:px-8 py-4 md:py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-base md:text-lg text-gray-900 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-teal-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 lg:px-8 pb-4 md:pb-5 text-gray-700 text-sm md:text-base leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FAQProps {
  items: FAQItemProps[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, index) => (
        <FAQItem key={index} {...item} />
      ))}
    </div>
  );
}
