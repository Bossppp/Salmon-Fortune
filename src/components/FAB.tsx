import React from "react";

const FAB = ({
  children,
  text,
  onClick,
}: {
  text: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="bg-bg-shadow text-line font-medium px-4 py-2 rounded-md hover:bg-primary hover:translate-y-0.5 border-2 border-line transition-all flex flex-row"
      onClick={onClick}
    >
      <span className="mr-2 hidden sm:inline">{text}</span>
      {children}
    </button>
  );
};

export default FAB;
