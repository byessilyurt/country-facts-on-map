import React from "react";

function Button({ setIsActive }) {
  const handleNext = () => {
    console.log(setIsActive);
    setIsActive(true);
  };

  return (
    <div className="absolute top-0 flex z-10 mx-auto w-full justify-center ">
      <div className=" w-80 flex justify-center bg-gray-100 rounded">
        <button onClick={handleNext} className="tracking-wider">
          Next Country
        </button>
      </div>
    </div>
  );
}

export default Button;
