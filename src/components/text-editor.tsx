import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { useState, useEffect, useRef } from "react";
import { Cell } from "../state";
import { useAction } from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEdit] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const { update_cell } = useAction();

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
        <MDEditor
          value={cell.content}
          onChange={(v) => update_cell(cell.id, v || "")}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEdit(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content} />
      </div>
    </div>
  );
};

export default TextEditor;
