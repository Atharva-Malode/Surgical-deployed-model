import React from "react";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const detectionPage = () => {
    navigate("/detection");
  }

  return (
    <div className="text-center p-4 mx-4">
      <h1 className="font-serif text-4xl font-bold text-indigo-600 dark:text-white leading-tight">
        Surgical Tools Detection
      </h1>

      <h2 className="font-sans text-2xl font-medium text-gray-700 dark:text-white leading-snug w-full">
        Detect Sugical Tools
      </h2>

      <p className="font-sans text-gray-500 dark:text-white text-lg italic mt-2">
      Select our Trained model
      </p>


      <div className="flex justify-center mt-2 gap-4">

        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full mt-6"
          onClick={detectionPage}
        >
          Detect Tool
        </button>
      </div>
    </div>
  );
}

export default HomePage;