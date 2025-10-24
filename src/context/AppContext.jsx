import { createContext, useState } from "react";
import { MD5, SHA1, SHA256 } from "../utils/HashFunctions.js";
import { benchmarkHashes } from "../utils/BenchmarkHashes.js";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [suffle, setSuffle] = useState(false);
  const hashAlgorithms = ["MD5", "SHA1", "SHA256"];
  const [inputType, setInputType] = useState("text");

  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");
  const [hashValues, setHashValues] = useState([]);
  const [imageInput, setImageInput] = useState(null);
  const [suffleImgInput, setSuffleImgInput] = useState(null);

  const [isHashGeneratorRunning, setIsHashGeneratorRunning] = useState(false);

  const convertImageToBytes = async (imageFile) => {
    if (!imageFile) return null;
    const arrayBuffer = await imageFile.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const generateHashValues = async (input1, input2) => {
    setHashValues([]);
    setIsHashGeneratorRunning(true);
    
    let inputBytes1 = null;
    let inputBytes2 = null;

    if (inputType === "text") {
      const encoder = new TextEncoder();
      inputBytes1 = encoder.encode(input1);
      inputBytes2 = encoder.encode(input2);
    } else {
      inputBytes1 = await convertImageToBytes(input1);
      inputBytes2 = await convertImageToBytes(input2);
    }

    // Run benchmark to get average times
    const benchmarkResults = await benchmarkHashes(inputBytes1, 10);

    const avgMD5 = parseFloat(
      benchmarkResults.find((r) => r.algorithm === "MD5")?.average || 0
    );
    const avgSHA1 = parseFloat(
      benchmarkResults.find((r) => r.algorithm === "SHA1")?.average || 0
    );
    const avgSHA256 = parseFloat(
      benchmarkResults.find((r) => r.algorithm === "SHA256")?.average || 0
    );

    const [
      result_md5_1,
      result_md5_2,
      result_sha1_1,
      result_sha1_2,
      result_sha256_1,
      result_sha256_2,
    ] = await Promise.all([
      MD5(inputBytes1),
      MD5(inputBytes2),
      SHA1(inputBytes1),
      SHA1(inputBytes2),
      SHA256(inputBytes1),
      SHA256(inputBytes2),
    ]);

    const newHashValues = [
      {
        id: "MD5",
        values: [result_md5_1, result_md5_2],
        times: avgMD5,
      },
      {
        id: "SHA1",
        values: [result_sha1_1, result_sha1_2],
        times: avgSHA1,
      },
      {
        id: "SHA256",
        values: [result_sha256_1, result_sha256_2],
        times: avgSHA256,
      },
    ];
    console.log(newHashValues);
    
    setHashValues(newHashValues);
    setIsHashGeneratorRunning(false);
  };

  const generateShuffledImage = async (file) => {
    if (!file) return null;

    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);

    byteArray[0] = (byteArray[0] + Math.floor(Math.random() * 256)) % 256;

    const shuffledBlob = new Blob([byteArray], { type: file.type });

    const shuffledFile = new File([shuffledBlob], `shuffled_${file.name}`, {
      type: file.type,
    });

    setSuffleImgInput(shuffledFile);
    return shuffledFile;
  };

  const values = {
    hashAlgorithms,
    inputType,
    setInputType,
    textInput1,
    setTextInput1,
    textInput2,
    setTextInput2,
    imageInput,
    setImageInput,
    suffleImgInput,
    setSuffleImgInput,
    generateHashValues,
    generateShuffledImage,
    hashValues,
    setHashValues,
    suffle,
    setSuffle,
    setHashValues,
    isHashGeneratorRunning,
  };

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
