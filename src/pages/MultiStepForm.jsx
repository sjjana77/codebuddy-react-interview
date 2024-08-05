import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form1 from "../components/Form1";
import Form2 from "../components/Form2";
import Form3 from "../components/Form3";
import Stepper from "../components/Stepper";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(formData);
  }, [formData])

  //Form validations
  const validateForm = () => {
    switch (step) {
      case 1:
        return validateForm1();
      case 2:
        return validateForm2(formData);
      case 3:
        return validateForm3(formData);
      default:
        return true;
    }
  };

  //Validation for Form1
  const validateForm1 = () => {
    const errors = {};
    if (!formData.emailId) {
      errors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      errors.emailId = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!/(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*\d){2})(?=(?:.*[!@#$%^&*()]){2}).{8,}/.test(formData.password)) {
      errors.password = "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters.";
    }
    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //Validation for Form2
  const validateForm2 = (formData) => {
    const errors = {};
    // console.log(formData);
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    } else if (!/^[A-Za-z]{2,50}$/.test(formData.firstName)) {
      errors.firstName = "First name must be between 2 and 50 alphabets";
    }

    if (formData.lastName && !/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name must contain only alphabets";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    } else if (formData.address.length < 10) {
      errors.address = "Address must be at least 10 characters long";
    }


    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateForm3 = (formData) => {
    const errors = {};

    if (!formData.countryCode) {
      errors.countryCode = "Country code is required";
    } else if (!["+91", "+1"].includes(formData.countryCode)) {
      errors.countryCode = "Invalid country code. Only India (+91) and America (+1) are allowed";
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be a 10 digit number";
    }

    if (!formData.acceptTermsAndCondition) {
      errors.acceptTermsAndCondition = "You must accept the terms and conditions";
    }

    console.log(errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStepChange = (newStep) => {
    if (newStep < step) {
      setStep(newStep);
    } else if (newStep > step && validateForm()) {
      setStep(newStep);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const { acceptTermsAndCondition, ...submissionData } = formData;
      try {
        const response = await fetch("https://codebuddy.review/submit", {
          method: "POST",
          body: JSON.stringify(submissionData),
        });
        const data = await response.json();
        console.log("Response:", data);
        navigate("/posts");
      } catch (error) {
        console.error("Error submitting form:", error);
      }

    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <Form1 formData={formData} errors={errors} handleInputChange={handleInputChange} />;
      case 2:
        return <Form2 formData={formData} errors={errors} handleInputChange={handleInputChange} />;
      case 3:
        return <Form3 formData={formData} errors={errors} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <Stepper step={step} onStepChange={handleStepChange} />
      {renderForm()}
      <div className="flex justify-between mt-4">
        <button
          className="btn bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={step === 1}
          onClick={prevStep}
        >
          Back
        </button>
        {step < 3 ? (
          <button
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
            onClick={nextStep}
          >
            Save and Next
          </button>
        ) : (
          <button
            className="btn bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
