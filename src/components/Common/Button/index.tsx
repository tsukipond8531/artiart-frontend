import React from "react";

interface ButtonProps {
  title?: any;
  icon?: React.ReactNode;
  className?: string; // Making className optional
  onClick?: () => void;
  value?: any; // Adjusting the type for onClick to match a function that doesn't return anything
}

const Button: React.FC<ButtonProps> = ({
  title,
  className,
  onClick,
  value,
  icon,
}) => {
  return (
    <button  onClick={onClick} value={value} className={`${className} flex items-center gap-2 p-2  rounded-md`}>
     {icon} {title}
    </button>
  );
};

export default Button;
