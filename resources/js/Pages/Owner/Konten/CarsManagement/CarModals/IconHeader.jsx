import React from "react";
import { Settings, AlertTriangle, FileText, CheckCircle } from "lucide-react";

const StepperHeader = ({ step }) => {
  const steps = [
    { id: 1, icon: Settings },
    { id: 2, icon: AlertTriangle },
    { id: 3, icon: FileText },
    { id: 4, icon: CheckCircle },
  ];

  return (
    <div className="flex items-center justify-between mb-6 w-full">
      {steps.map((s, index) => {
        const Icon = s.icon;
        const isActive = step === s.id;
        const isCompleted = step > s.id;

        return (
          <React.Fragment key={s.id}>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                isActive
                  ? "bg-blue-100 text-blue-500"
                  : isCompleted
                  ? "bg-green-100 text-green-500"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Icon className="w-6 h-6 " />
            </div>

            {/* Line separator */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-px bg-gray-300 mx-2"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepperHeader;
