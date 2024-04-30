import React from "react";

interface ButtonProps {
  title?: any;
  className?: string; 
  onClick?: () => void;
  value?: any;
  icon?:any;
type?:any
}

const Button: React.FC<ButtonProps> = ({
  title,
  className,
  onClick,
  value,
  icon,
  type
}) => {
  return (
    <button  onClick={onClick} value={value} type={type} className={`${className}  p-2  rounded-md`}>
      {title}{icon}
    </button>
  );
};

export default Button;
