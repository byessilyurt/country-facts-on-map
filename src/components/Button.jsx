import React from "react";

function Button({ isActive, setIsActive, setPrevious, prevCountries }) {
  // previousCountries.length == 0 değilse previous butonunu aktifleştir
  // buton tıklandığında previousCountries'in son elemanını al haberleri çek
  // ve son elemanı previousCountries ten sil

  const disabled = !prevCountries.length === 0;

  // const handlePrevious = () => {
  //   setPrevious(true);
  //   setIsActive(true);
  // };

  const handleNext = () => {
    setIsActive(true);
    setPrevious(false);
  };

  return (
    <div className="absolute top-0 flex z-10 mx-auto w-full justify-center ">
      <div className=" w-80 flex justify-center bg-gray-100 rounded">
        {/* <button
          onClick={handlePrevious}
          disabled={true}
          className="line-through"
        >
          Previous
        </button> */}
        <button onClick={handleNext} className="tracking-wider">
          Next Country
        </button>
      </div>
    </div>
  );
}

export default Button;
