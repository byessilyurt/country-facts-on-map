import React from "react";

function Button({ isActive, setIsActive, setPrevious, prevCountries }) {
  // previousCountries.length == 0 değilse previous butonunu aktifleştir
  // buton tıklandığında previousCountries'in son elemanını al haberleri çek
  // ve son elemanı previousCountries ten sil

  const disabled = !prevCountries.length === 0;

  const handlePrevious = () => {
    setPrevious(true);
    setIsActive(true);
  };

  const handleNext = () => {
    setIsActive(true);
    setPrevious(false);
  };

  return (
    <div className="absolute top-0 flex z-10 mx-auto w-full justify-center ">
      <div className="text-red-400 bg-blue-100 w-80 flex justify-between">
        <button onClick={handlePrevious} disabled={disabled}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Button;
