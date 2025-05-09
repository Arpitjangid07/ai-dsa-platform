import React from "react";

export function Card({ className = "", children }) {
  return (
    <div className={`bg-white rounded-2xl shadow p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}
