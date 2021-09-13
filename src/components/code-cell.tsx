import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import bundler from "../bundler";

const CodeCell = () => {
  const [input, setinput] = useState("");
  const [code, setcode] = useState("");

  const handleClick = async () => {
    const output = await bundler(input);
    setcode(output);
  };

  return (
    <>
      <div>
        <CodeEditor
          initialValue="var a=1;"
          onChange={(value) => setinput(value)}
        />
      </div>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <div>
        <Preview code={code} />
      </div>
    </>
  );
};

export default CodeCell;
