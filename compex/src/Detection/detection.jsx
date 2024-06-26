import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DetectionPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const navigate = useNavigate();
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleNext = () => {
        navigate('/results');
    };

    useEffect(() => {
        console.log("Prediction state:", prediction);
    }, [prediction]);

    const handleImageChange = async (e) => {
        try {
            const file = e.target.files[0];
            setSelectedImage(file);

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Spitting Detection Result:", data.result);

            setGeneratedImage(data.generatedImage);
            setPrediction(data.result);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="text-center px-8">
            <h1>Spitting Detection</h1>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className={`mt-6 ${generatedImage ? 'basis-1/2' : ''} rounded-3xl text-center w-full flex flex-col sm:justify-center sm:items-center sm:pt-16 sm:pb-10 bg-white shadow-2xl border border-gray-300`}>
                    <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 mt-4 rounded-full cursor-pointer !border !border-transparent transition ease-in-out text-center no-underline hover:no-underline inline-flex items-center justify-center text-xl">
                        <p className="pr-2">Upload Image</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    <div className="sm:flex flex-col gap-1.5 text-gray-800">
                        <p className="font-semibold text-xl text-typo-secondary">
                            or drop a file, or
                        </p>
                        <p className="text-xs text-typo-secondary">
                            paste an image
                        </p>
                    </div>
                    {selectedImage && (
                        <div className="mx-4 flex flex-col items-center">
                            <p className="text-black">Selected Image</p>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected Image"
                                className="max-w-full rounded-lg h-32"
                            />
                        </div>
                    )}
                </div>
                {generatedImage && (
                    <div className="basis-1/2 mt-6">
                        <img
                            src={`data:image/jpeg;base64,${generatedImage}`}
                            alt="Generated Image"
                            className="max-w-full rounded-3xl"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetectionPage;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function DetectionPage() {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [prediction, setPrediction] = useState(null);
//     const navigate = useNavigate();
//     const [generatedImage, setGeneratedImage] = useState(null);

//     const handleNext = () => {
//         navigate('/results');
//     };

//     useEffect(() => {
//         console.log("Prediction state:", prediction);
//     }, [prediction]);

//     const handleImageChange = async (e) => {
//         try {
//             const file = e.target.files[0];
//             setSelectedImage(file);

//             const formData = new FormData();
//             formData.append("file", file);

//             const response = await fetch("http://127.0.0.1:8000/upload", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Spitting Detection Result:", data.result);

//             setGeneratedImage(data.generatedImage);
//             setPrediction(data.result);
//         } catch (error) {
//             console.error("Error:", error.message);
//         }
//     };

//     return (
//         <div className="text-center px-8">
//             <h1>Spitting Detection</h1>
//             <div className="flex flex-col sm:flex-row gap-2">
//                 <div className={`mt-6 ${generatedImage ? 'basis-1/2' : ''} rounded-3xl text-center w-full flex flex-col sm:justify-center sm:items-center sm:pt-16 sm:pb-10 bg-white shadow-2xl border border-gray-300`}>
//                     <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 mt-4 rounded-full cursor-pointer !border !border-transparent transition ease-in-out text-center no-underline hover:no-underline inline-flex items-center justify-center text-xl">
//                         <p className="pr-2">Upload Image</p>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
//                         </svg>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="hidden"
//                         />
//                     </label>
//                     <div className="sm:flex flex-col gap-1.5 text-gray-800">
//                         <p className="font-semibold text-xl text-typo-secondary">
//                             or drop a file, or
//                         </p>
//                         <p className="text-xs text-typo-secondary">
//                             paste an image
//                         </p>
//                     </div>
//                     {selectedImage && (
//                         <div className="mx-4 flex flex-col items-center">
//                             <p className="text-black">Selected Image</p>
//                             <img
//                                 src={URL.createObjectURL(selectedImage)}
//                                 alt="Selected Image"
//                                 className="max-w-full rounded-lg h-32"
//                             />
//                         </div>
//                     )}
//                 </div>
//                 {generatedImage && (
//                     <div className="basis-1/2 mt-6">
//                         <img
//                             src={`data:image/jpeg;base64,${generatedImage}`}
//                             alt="Generated Image"
//                             className="max-w-full rounded-3xl"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default DetectionPage;
