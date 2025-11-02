# Hash Comparator

Hash Comparator is a web application built using **React** and **vite** that allows you to compute, compare, and benchmark cryptographic hashes (**MD5**, **SHA1**, **SHA256**) for both text inputs and image files.

### [Live Demo](https://imsonu2030.github.io/hash-comparator)

---

## Features

- **Dual Input Modes**  
  Choose between manual text input or uploading an image file.

- **Multiple Algorithms**  
  Supports MD5, SHA1, and SHA256 hashing.

- **Text Comparison**  
  Compare hash values of two different text inputs side-by-side.

- **Image Comparison**  
  Upload an image to compare its hash, and optionally toggle "Shuffle" to modify 1 byte of the file — demonstrating the **Avalanche Effect**.

- **Performance Benchmarking**  
  Displays average hash generation time (in milliseconds) for each algorithm.

- **Responsive UI**  
  Clean interface using TailwindCSS.

---

## Core Functionality

All primary logic is centralized in a global **React Context** (`AppContext.jsx`) which manages app state, input values, hashing outputs, and benchmarking behavior.

### Input Handling (`InputSelector.jsx`)
- **Manual Input Mode** → user enters two text strings  
  - both strings are encoded via `TextEncoder` → `Uint8Array` → hashing
- **Image Upload Mode** → user uploads **one** image file  
  - default: hash Image A vs Image A (identical)  
  - **Shuffle Mode**: app clones the file buffer and mutates the **first byte**  
    ```js
    byteArray[0] = (byteArray[0] + Math.floor(Math.random() * 256)) % 256
    ```
    => demonstrates **Avalanche Effect** (tiny change → drastically different hash)

### Hashing + Benchmarking
- hashing functions live in: `src/utils/HashFunctions.js` (via `crypto-js`)
- benchmarking logic in: `BenchmarkHashes.js`  
- on submit:
  1) benchmark input #1  
     - each algorithm (MD5, SHA1, SHA256) runs 10 cycles  
     - each cycle is timed using `performance.now()`  
     - app computes avg / min / max ms
  2) generate hashes for both inputs (text or image)


## Project Setup

To get the project running locally, you'll need to have **Nodejs** installed in your system. Then follow the steps given below,

- clone the repository:
    ```bash
    git clone https://github.com/ImSonu2030/hash-comparator.git
    cd hash-comparator
    ```
- install dependencies:
    ```bash
    npm install
    ```
- run the development server:
    ```bash
    npm run dev
    ```
- open: `http://localhost:5173` in your browser.