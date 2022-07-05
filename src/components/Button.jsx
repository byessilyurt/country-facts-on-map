import React from "react";

function Button({ isActive, setIsActive }) {
  const activeHandler = () => {
    setIsActive((prev) => !prev);
    console.log("button clicked", isActive);
  };

  return (
    <div className="absolute top-0 flex z-10 mx-auto w-full justify-center ">
      <div className="text-red-400 bg-blue-100 w-80 flex justify-between">
        <button>Previous</button>
        <button onClick={activeHandler}>{isActive ? "Stop" : "Start"}</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default Button;
