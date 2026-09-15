// src/components/ui/card.jsx
export const Card = ({ className = "", children }) => (
    <div className={`rounded-xl shadow-lg border ${className}`}>{children}</div>
  );
  
  export const CardContent = ({ className = "", children }) => (
    <div className={className}>{children}</div>
  );
  