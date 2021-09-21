import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import bundler from "../bundler";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [input, setinput] = useState("");
  const [error, setError] = useState("");
  const [code, setcode] = useState("");

  useEffect(() => {
    var timer = setTimeout(async () => {
      const output = await bundler(input);
      setcode(output.code);
      output.err && setError(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="verticle">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="var a=1;"
            onChange={(value) => setinput(value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
