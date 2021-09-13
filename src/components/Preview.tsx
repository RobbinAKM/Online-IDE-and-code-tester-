import { useEffect, useRef } from "react";

interface PreviewInterface {
  code: string;
}

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

const Preview: React.FC<PreviewInterface> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <div>
      <iframe
        title="code view"
        ref={iframe}
        sandbox="allow-scripts allow-modals"
        srcDoc={html}
      ></iframe>
    </div>
  );
};

export default Preview;
