import React from "react";

export const SkeletonCard = () => {
  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        height: "150px",
        borderRadius: "8px",
        marginBottom: "1rem",
        animation: "pulse 1.5s infinite",
      }}
    >
      {/* You can add skeleton structure here */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
