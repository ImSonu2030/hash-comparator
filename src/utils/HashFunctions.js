import CryptoJS from 'crypto-js';

export const MD5 = async (inputBytes) => {
  const wordArray = CryptoJS.lib.WordArray.create(inputBytes); 
  const hash = CryptoJS.MD5(wordArray);
  return hash.toString(CryptoJS.enc.Hex);
}

export const SHA1 = async (inputBytes) => {
    const buffer = inputBytes instanceof ArrayBuffer ? inputBytes : inputBytes.buffer;

    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

export const SHA256 = async (inputBytes) => {
    const buffer = inputBytes instanceof ArrayBuffer ? inputBytes : inputBytes.buffer;

    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}