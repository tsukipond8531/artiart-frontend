import React from "react";

interface ButtonProps {
  title?: any;
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
    <button  onClick={onClick} value={value} className={`${className}  p-2  rounded-md`}>
      {title}
    </button>
  );
};

export default Button;
