import React from "react";

interface ButtonProps {
  title?: React.ReactNode;
  className?: string; // Making className optional
  onClick?: () => void;
  value?: any; // Adjusting the type for onClick to match a function that doesn't return anything
}

const Button: React.FC<ButtonProps> = ({
  title,
  className,
  onClick,
  value,
}) => {
  return (
    <button  onClick={onClick} value={value} className={`${className} bg-primary-orange-300 hover:bg-primary-orange-400 p-2  rounded-md`}>
      {title}
    </button>
  );
};

export default Button;
