import CryptoJS from 'crypto-js';

const toWordArray = (inputBytes) => {
  if (inputBytes instanceof ArrayBuffer) {
    inputBytes = new Uint8Array(inputBytes);
  }
  return CryptoJS.lib.WordArray.create(inputBytes);
};

export const MD5 = async (inputBytes) => {
  const wordArray = toWordArray(inputBytes);
  const hash = CryptoJS.MD5(wordArray);
  return hash.toString(CryptoJS.enc.Hex);
};

export const SHA1 = async (inputBytes) => {
  const wordArray = toWordArray(inputBytes);
  const hash = CryptoJS.SHA1(wordArray);
  return hash.toString(CryptoJS.enc.Hex);
};

export const SHA256 = async (inputBytes) => {
  const wordArray = toWordArray(inputBytes);
  const hash = CryptoJS.SHA256(wordArray);
  return hash.toString(CryptoJS.enc.Hex);
};