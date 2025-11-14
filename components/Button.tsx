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
  // Mobile-first approach con mejores prácticas UX/UI
  const baseStyles = "font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto touch-manipulation active:scale-95 leading-tight";

  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white",
    secondary: "bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-white"
  };

  // Responsive sizing: mobile → sm → md → lg → xl
  // Mobile-first: Pequeño en móvil, crece progresivamente
  // Mínimo 44px de altura para cumplir con Apple HIG y accesibilidad
  const sizes = {
    sm: "w-full sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-none gap-1.5 sm:gap-2 px-5 py-2.5 text-sm sm:px-6 sm:py-3 md:px-7 md:py-3.5 min-h-[44px]",
    md: "w-full sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-none gap-1.5 sm:gap-2 px-6 py-3 text-sm sm:px-7 sm:py-3.5 md:px-8 md:py-4 md:text-base lg:px-10 lg:py-5 lg:text-lg min-h-[44px]",
    lg: "w-full sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-none gap-2 sm:gap-2.5 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg lg:px-12 lg:py-6 lg:text-xl min-h-[48px]"
  };

  // Tamaños de iconos responsivos según el tamaño del botón
  const iconSizes = {
    sm: "w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0",
    md: "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0",
    lg: "w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      <span className="text-center">{children}</span>
      {icon && <ArrowRight className={iconSizes[size]} />}
    </motion.button>
  );
}
