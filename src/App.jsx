import { Header } from "./components/Header";
import { HashFunctions } from "./components/HashFunctions.jsx";
import { InputSelector } from "./components/InputSelector.jsx";
import { Result } from "./components/Result.jsx";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <div className="w-60 bg-stone-800 p-4 shadow-lg fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto text-zinc-100">
          <HashFunctions />
        </div>

        <div className="flex-1 ml-64 p-4 flex flex-col gap-4 mt-16">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <InputSelector />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Result />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
