import React from "react";

interface AlertProps {
  variant?: "info" | "error" | "success";
  title: string;
  description: string;
}

export function Alert({ variant = "info", title, description }: AlertProps) {
  let bgColor = "bg-blue-100 text-blue-800";

  if (variant === "error") {
    bgColor = "bg-red-100 text-red-800";
  } else if (variant === "success") {
    bgColor = "bg-green-100 text-green-800";
  }

  return (
    <div className={`p-4 rounded-md ${bgColor}`} role="alert">
      <strong className="block font-semibold">{title}</strong>
      <p>{description}</p>
    </div>
  );
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <div className="font-bold mb-1">{children}</div>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
