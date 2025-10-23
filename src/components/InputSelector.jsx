import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const InputSelector = () => {
  const {
    inputType,
    setInputType,
    textInput1,
    setTextInput1,
    textInput2,
    setTextInput2,
    imageInput,
    setImageInput,
    generateHashValues,
    generateShuffledImage,
    suffle,
    setSuffle,
  } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputType === "text") {
      if (textInput1.trim() === "" || textInput2.trim() === "") {
        alert("Input missing");
        setTextInput1("");
        setTextInput2("");
        return;
      }
      generateHashValues(textInput1, textInput2);
    } else {
      if (!imageInput) {
        alert("No image selected!");
        setImageInput(null);
        return;
      }

      if (suffle) {
        const shuffledFile = await generateShuffledImage(imageInput);
        generateHashValues(imageInput, shuffledFile);
      } else {
        generateHashValues(imageInput, imageInput);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-md shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-left text-gray-800">
        Enter Input
      </h2>
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setInputType("text")}
          className={`px-6 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 w-1/2 ${
            inputType === "text"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Manual Input
        </button>
        <button
          onClick={() => setInputType("image")}
          className={`px-6 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 w-1/2 ${
            inputType === "image"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Upload Image
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {inputType === "text" ? (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label
                htmlFor="input1"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Input 1
              </label>
              <input
                type="text"
                id="input1"
                value={textInput1}
                onChange={(e) => setTextInput1(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your input"
                required
              />
            </div>
            <div>
              <label
                htmlFor="input2"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Input 2
              </label>
              <input
                type="text"
                id="input2"
                value={textInput2}
                onChange={(e) => setTextInput2(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your input"
                required
              />
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn space-y-4">
            <div>
              <label
                htmlFor="imageUpload"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload an Image
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={(e) => setImageInput(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                required
              />
              {imageInput && (
                <p className="text-xs text-gray-500 mt-2">
                  Selected file: {imageInput.name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => setSuffle((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  suffle ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    suffle ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700 font-medium">Shuffle</span>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 border border-transparent rounded-md shadow-sm cursor-pointer text-md font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
