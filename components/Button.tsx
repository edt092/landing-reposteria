'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = true
}: ButtonProps) {
  const baseStyles = "font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto w-fit";

  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white",
    secondary: "bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-white"
  };

  const sizes = {
    sm: "px-6 py-3 text-sm md:px-8 md:py-3",
    md: "px-8 py-4 text-base md:text-lg md:px-10 md:py-5",
    lg: "px-10 py-5 text-lg md:text-xl md:px-14 md:py-6"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
      {icon && <ArrowRight className="w-5 h-5" />}
    </motion.button>
  );
}
