import React from "react";

function Button({ setIsActive }) {
  const handleNext = () => {
    setIsActive(true);
  };

  return (
    <div className="absolute top-2 flex z-10 mx-auto w-full justify-center ">
      <div className=" w-40 flex justify-center text-[#1c2839] bg-[#d2e0e7] rounded-xl shadow-xl">
        <button onClick={handleNext} className="tracking-wider">
          Next Country
        </button>
      </div>
    </div>
  );
}

export default Button;
