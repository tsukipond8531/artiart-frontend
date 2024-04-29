import React from 'react'

interface HeadingProps {
  icon?: React.ReactNode;
  title: any;
  title1?: string;
  className?: string;
  spanclass?: string;
}

export const HeadingH1: React.FC<HeadingProps> = ({ icon, title, title1, className, spanclass }) => {
  return (
    
      <span className={`xl:text-xl-h1 lg:text-lg-h1 text-md-h1 poppins-thin gap-3 ${className}`}>
        {icon}{title}
        <span className={`${spanclass}`}>
          {title1}
        </span>
      </span>
  
  );
};

export const HeadingH2: React.FC<HeadingProps> = ({ icon, title, className }) => {
  return (
    
      <p className={`xl:text-xl-h2 lg:text-lg-h2 text-md-h2 poppins-thin gap-3 ${className}`}>
        {icon}{title}
      </p>
    
  );
};

export const HeadingH3: React.FC<HeadingProps> = ({ icon, title, className }) => {
  return (
    
      <p className={`xl:text-xl-h3 lg:text-lg-h3 text-md-h4 poppins-thin gap-3 ${className}`}>
        {icon}{title}
      </p>
    
  );
};

export const HeadingH4: React.FC<HeadingProps> = ({ icon, title, className }) => {
  return (
    
      <p className={`xl:text-xl-h4 lg:text-lg-h4 text-md-h4 poppins-thin gap-3 ${className}`}>
        {icon}{title}
      </p>
    
  );
};

export const HeadingH5: React.FC<HeadingProps> = ({ icon, title, className }) => {
  return (
    
      <p className={`xl:text-xl-h5 lg:text-lg-h5 text-md-h5 poppins-thin gap-3 ${className}`}>
        {icon}{title}
      </p>
    
  );
};

export const HeadingH6: React.FC<HeadingProps> = ({ icon, title, className="poppins-thin" }) => {
  return (
    
      <p className={`xl:text-xl-h6 lg:text-lg-h6 text-md-h6  gap-3 ${className}`}>
        {icon}{title}
      </p>
    
  );
};
