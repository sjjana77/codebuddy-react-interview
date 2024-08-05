const Form3 = ({ formData, handleInputChange, errors }) => {

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Country Code</label>
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="">Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="acceptTermsAndCondition"
            checked={formData.acceptTermsAndCondition}
            onChange={handleInputChange}
            className="mr-2"
          />
          I accept the terms and conditions
        </label>
        {errors.acceptTermsAndCondition && (
          <p className="text-red-500 text-sm">{errors.acceptTermsAndCondition}</p>
        )}
      </div>
    </div>
  );
};

export default Form3;
