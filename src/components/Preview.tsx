import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewInterface {
  code: string;
  bundlingStatus: string;
}

const html = `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
  </head>
  <body>
  <div id="root"></div>
  <script>
    const errorHandler=(err)=>{
      document.querySelector('#root').innerHTML='<div style="color:red;"><h4>run time error</h4>'+err.message+'<div>';
      throw err
    }
      window.addEventListener('error',(event)=>{
        errorHandler(event.error)
      })
      window.addEventListener('message',(event)=>{
      try {
        eval(event.data)
      } catch (err) {
         errorHandler(err)
      }
}
    ,false)
  </script>
  </body>
</html>

`;

const Preview: React.FC<PreviewInterface> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="code view"
        ref={iframe}
        sandbox="allow-scripts allow-modals"
        srcDoc={html}
      ></iframe>
      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
