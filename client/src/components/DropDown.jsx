import React from "react";

const DropDown = ({
  labelName,
  placeholder,
  isTextArea,
  inputType,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}

      <select className="py-[20px] sm:px-[25px] px-[20px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
        <option value="Fundraiser">Fundraiser</option>
        <option value="Nonprofit">Nonprofit</option>
        <option value="Medical">Medical</option>
        <option value="Crisis Relief">Crisis Relief</option>
        <option value="Education">Education</option>
        <option value="Emergency">Emergency</option>
        <option value="Fundraiser">Fundraiser</option>
      </select>
    </label>
  );
};

export default DropDown;
