import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/unpkg-fetch-plugin";

const App = () => {
  const [input, setinput] = useState("");
  const [code, setcode] = useState("");

  const ref = useRef<any>();
  const iframe = useRef<any>();
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const handleClick = async () => {
    if (!ref.current) return;
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
    </head>
    <body>
    <div id="root"></div>
    <script>
        window.addEventListener('message',(event)=>eval(event.data),false)
    </script>
    </body>
  </html>

  `;

  useEffect(() => {
    startService();
  }, []);

  return (
    <>
      <div>
        <textarea
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
          }}
        ></textarea>
      </div>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <div>
        <pre>{code}</pre>
        <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html}></iframe>
      </div>
    </>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
