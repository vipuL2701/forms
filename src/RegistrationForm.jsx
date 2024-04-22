import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const handleStepOneSubmit = (data) => {
    setUserData(data);
    setStep(2);
  };

  const handleStepTwoSubmit = (data) => {
    dispatch(addUser({ ...userData, ...data }));
    setStep(1);
    setUserData({});
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div>
      {step === 1 && <StepOneForm onNext={handleStepOneSubmit} />}
      {step === 2 && (
        <StepTwoForm onBack={handleBack} onSubmit={handleStepTwoSubmit} />
      )}
    </div>
  );
};

export default RegistrationForm;
