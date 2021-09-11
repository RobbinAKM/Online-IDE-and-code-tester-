import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/unpkg-fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
  const [input, setinput] = useState("");

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
    iframe.current.srcdoc = html;
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
        window.addEventListener('message',(event)=>{
        try {
          eval(event.data)
        } catch (err) {
           document.querySelector('#root').innerHTML='<div style="color:red;"><h4>run time error</h4>'+err.message+'<div>';
           throw err
        }
}
      ,false)
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
        <CodeEditor
          initialValue="var a=1;"
          onChange={(value) => setinput(value)}
        />
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
        <iframe
          title="code view"
          ref={iframe}
          sandbox="allow-scripts allow-modals"
          srcDoc={html}
        ></iframe>
      </div>
    </>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
