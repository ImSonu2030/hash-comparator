import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const HashFunctions = () => {
  const { hashAlgorithms } = useContext(AppContext);

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4 text-zinc-100">
        Hash Functions
      </h2>
      <div className="flex flex-col gap-2">
        {hashAlgorithms.map((hash,indx) => (
          <div
            key={indx}
            className="bg-zinc-700 text-zinc-200 p-2 rounded-md text-center cursor-pointer hover:bg-zinc-600 transition-colors"
          >
            {hash}
          </div>
        ))}
      </div>
    </div>
  );
};
