import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "/@#$*&!";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword]);

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numberAllow, charAllow, passGenerator]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-slate-900 text-slate-200">
      <div className="px-10 py-5 rounded-lg bg-slate-400 text-slate-900">
        <h1 className="mb-5 text-center text-3xl">Password Generator</h1>
        <div className="flex mb-4 justify-center rounded-xl overflow-hidden">
          <input
            type="text"
            readOnly
            ref={passwordRef}
            placeholder="password"
            value={password}
            className="outline-none w-96 p-2 text-orange-600 font-bold text-2xl basis-full"
          />
          <button
            onClick={copyPasswordToClip}
            className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700 active:bg-blue-950"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={8}
              max={20}
              defaultValue={0}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="" className="text-lg">
              Label: {length}
            </label>
          </div>

          <div className="flex item-center gap-x-1">
            <label
              className="inline-flex items-center cursor-pointer"
              htmlFor="numberInput"
            >
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={numberAllow}
                id="numberInput"
                onChange={() => {
                  setNumberAllow((prev) => !prev);
                }}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-2 text-lg font-medium">
                Number
              </span>
            </label>
          </div>

          <div className="flex item-center gap-x-1">
            <label
              className="inline-flex items-center cursor-pointer"
              htmlFor="charInput"
            >
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={charAllow}
                id="charInput"
                onChange={() => {
                  setCharAllow((prev) => !prev);
                }}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-2 text-lg font-medium">
                Unique-Characters
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
