import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { useState, useEffect, useRef } from "react";

const TextEditor: React.FC = () => {
  const [editing, setEdit] = useState(true);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEdit(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }
  return (
    <div onClick={() => setEdit(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
