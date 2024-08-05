import React from "react";

const Stepper = ({ step, onStepChange }) => {
  const steps = ["Form 1", "Form 2", "Form 3"];

  return (
    <div className="flex justify-between mb-4">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`flex-1 text-center cursor-pointer ${
            index + 1 <= step ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => onStepChange(index + 1)}
        >
          <div
            className={`rounded-full w-8 h-8 mx-auto mb-2 ${
              index + 1 <= step ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span className="text-white">{index + 1}</span>
          </div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
