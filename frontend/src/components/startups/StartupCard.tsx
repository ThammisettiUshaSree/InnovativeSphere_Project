"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Startup } from "@/types/startup";

interface Props {
  startup: Startup;
}

const StartupCard = ({ startup }: Props) => {
  // ✅ Declare SAFE values here (inside component, before return)
  const raised = startup.raisedSoFar ?? 0;
  const goal = startup.fundingGoal ?? 1; // avoid divide by zero

  return (
    <Card>
  <CardContent className="p-4 space-y-4">
    {/* Funding Goal */}
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Funding Goal</span>
      <span className="font-medium text-gray-900">
        ${goal.toLocaleString()}
      </span>
    </div>

    {/* Raised So Far */}
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Raised So Far</span>
      <span className="font-medium text-green-600">
        ${raised.toLocaleString()}
      </span>
    </div>

    {/* Progress Bar */}
    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-green-600 h-2 rounded-full transition-all duration-300"
        style={{
          width: `${Math.min((raised / goal) * 100, 100)}%`,
        }}
      />
    </div>

    {/* Address */}
    <div className="text-sm text-gray-600">
      {startup.address}
    </div>
  </CardContent>
</Card>

  );
};

export default StartupCard;
